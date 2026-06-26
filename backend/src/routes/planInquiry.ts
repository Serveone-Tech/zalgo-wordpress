import { Router, Request, Response } from 'express';
import { db } from '../db';
import { planInquiriesTable } from '../db/schema';
import { sendPlanInquiryEmail } from '../services/emailService';

const router = Router();

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, website, plan } = req.body;

    if (!name?.trim()) return res.status(400).json({ success: false, message: 'Name is required' });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    if (!phone?.trim()) return res.status(400).json({ success: false, message: 'Phone number is required' });
    if (!plan?.trim()) return res.status(400).json({ success: false, message: 'Plan is required' });

    const inquiry = await db.insert(planInquiriesTable).values({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website?.trim() || null,
      plan: plan.trim(),
    }).returning();

    await sendPlanInquiryEmail({ name, email, phone, website, plan });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! We will contact you within 24 hours.',
      data: inquiry[0],
    });
  } catch (error) {
    console.error('Plan inquiry error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

router.get('/list', async (_req: Request, res: Response) => {
  try {
    const { desc } = await import('drizzle-orm');
    const inquiries = await db.select().from(planInquiriesTable).orderBy(desc(planInquiriesTable.createdAt));
    return res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Fetch plan inquiries error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    const { eq } = await import('drizzle-orm');
    const deleted = await db.delete(planInquiriesTable).where(eq(planInquiriesTable.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    return res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
});

export default router;
