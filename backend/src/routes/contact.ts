import { Router, Request, Response } from 'express';
import { db } from '../db';
import { contactsTable } from '../db/schema';
import { sendContactEmail } from '../services/emailService';

const router = Router();

// Validation helper
function validateContactForm(data: any) {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email is invalid');
  }

  if (!data.mobile || data.mobile.trim().length === 0) {
    errors.push('Mobile number is required');
  } else if (!/^[\d+\-\s()]+$/.test(data.mobile)) {
    errors.push('Mobile number format is invalid');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  // Website is optional but validate if provided
  if (data.website && data.website.trim().length > 0) {
    try {
      new URL(data.website.startsWith('http') ? data.website : `https://${data.website}`);
    } catch {
      errors.push('Website URL is invalid');
    }
  }

  return errors;
}

// POST endpoint for contact form
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { name, email, website, mobile, message, service } = req.body;

    // Validate input
    const validationErrors = validateContactForm({ name, email, website, mobile, message });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Save to database
    const contact = await db.insert(contactsTable).values({
      name: name.trim(),
      email: email.trim(),
      website: website ? website.trim() : null,
      mobile: mobile.trim(),
      message: message.trim(),
      service: service ? service.trim() : null,
    }).returning();

    // Send emails
    await sendContactEmail({
      name,
      email,
      website,
      mobile,
      message,
      service: service || undefined,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! We will contact you soon.',
      data: contact[0],
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// GET endpoint to fetch all submissions (for admin)
router.get('/submissions', async (req: Request, res: Response) => {
  try {
    // In production, add authentication here
    const submissions = await db.select().from(contactsTable).orderBy((table) => table.createdAt);
    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
    });
  }
});

// DELETE endpoint to remove a submission
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const { eq } = await import('drizzle-orm');
    const deleted = await db.delete(contactsTable).where(eq(contactsTable.id, id)).returning();
    if (deleted.length === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    return res.status(200).json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Delete submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete submission' });
  }
});

export default router;
