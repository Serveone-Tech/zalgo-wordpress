import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  website?: string;
  mobile: string;
  message: string;
  service?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/contact/submit', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit form',
      errors: error.response?.data?.errors,
    };
  }
};

export const getContactSubmissions = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/contact/submissions');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch submissions',
    };
  }
};

export const deleteContactSubmission = async (id: number): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.delete(`/contact/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete submission',
    };
  }
};

export interface PlanInquiryData {
  name: string;
  email: string;
  phone: string;
  website?: string;
  plan: string;
}

export const submitPlanInquiry = async (data: PlanInquiryData): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/plan-inquiry/submit', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit inquiry',
    };
  }
};

export const getPlanInquiries = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/plan-inquiry/list');
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Failed to fetch inquiries' };
  }
};

export const deletePlanInquiry = async (id: number): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.delete(`/plan-inquiry/${id}`);
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Failed to delete inquiry' };
  }
};
