import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'login' | 'consultation' | 'contact' | 'meeting_approved';
  userEmail: string;
  userName: string;
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, userEmail, userName, data }: NotificationRequest = await req.json();
    
    let subject = '';
    let adminHtml = '';
    let userHtml = '';

    switch (type) {
      case 'login':
        subject = 'New User Login';
        adminHtml = `
          <h2>New User Login</h2>
          <p><strong>User:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Login Time:</strong> ${new Date().toLocaleString()}</p>
        `;
        userHtml = `
          <h2>Welcome ${userName}!</h2>
          <p>You have successfully logged into your account.</p>
          <p>If this wasn't you, please contact us immediately.</p>
        `;
        break;
        
      case 'consultation':
        subject = 'New Consultation Request';
        adminHtml = `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          <p><strong>Message:</strong> ${data.message || 'No message'}</p>
        `;
        userHtml = `
          <h2>Consultation Request Received</h2>
          <p>Dear ${userName},</p>
          <p>We have received your consultation request for <strong>${data.service}</strong>.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li>Preferred Date: ${data.preferredDate}</li>
            <li>Preferred Time: ${data.preferredTime}</li>
          </ul>
          <p>We will contact you soon to confirm your appointment.</p>
        `;
        break;
        
      case 'contact':
        subject = 'New Contact Message';
        adminHtml = `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `;
        userHtml = `
          <h2>Message Received</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for contacting us. We have received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${data.message}</p>
        `;
        break;
        
      case 'meeting_approved':
        subject = 'Consultation Approved - Meeting Scheduled';
        adminHtml = `
          <h2>Consultation Approved</h2>
          <p><strong>Client:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Meeting Date:</strong> ${data.meetingDate}</p>
          <p><strong>Meeting Time:</strong> ${data.meetingTime}</p>
          <p><strong>Duration:</strong> ${data.duration}</p>
          <p><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>
        `;
        userHtml = `
          <h2>🎉 Your Consultation is Approved!</h2>
          <p>Dear ${userName},</p>
          <p>Great news! Your consultation request for <strong>${data.service}</strong> has been approved.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">📅 Meeting Details</h3>
            <p><strong>Date:</strong> ${data.meetingDate}</p>
            <p><strong>Time:</strong> ${data.meetingTime}</p>
            <p><strong>Duration:</strong> ${data.duration}</p>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">🎥 Join Your Meeting</h3>
            <p>Click the link below to join your consultation meeting:</p>
            <a href="${data.meetingLink}" style="display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0;">Join Google Meet</a>
            <p style="font-size: 14px; color: #666;">Or copy this link: ${data.meetingLink}</p>
          </div>
          
          <p><strong>What to expect:</strong></p>
          <ul>
            <li>Please join the meeting 5 minutes early</li>
            <li>Ensure you have a stable internet connection</li>
            <li>Test your camera and microphone beforehand</li>
            <li>Prepare any questions you'd like to discuss</li>
          </ul>
          
          <p>We look forward to speaking with you!</p>
          <p>If you have any questions or need to reschedule, please contact us immediately.</p>
        `;
        break;
    }

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: "Admin Notifications <onboarding@resend.dev>",
      to: ["admin@yourcompany.com"], // Replace with actual admin email
      subject: subject,
      html: adminHtml,
    });

    // Send confirmation email to user
    const userConfirmation = await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>",
      to: [userEmail],
      subject: `Confirmation: ${subject}`,
      html: userHtml,
    });

    console.log("Emails sent successfully:", { adminEmail, userConfirmation });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);