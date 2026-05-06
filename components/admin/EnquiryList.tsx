"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Send, X, MessageSquareReply, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  productName: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function EnquiryList({ enquiries: initialEnquiries }: { enquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleReply = async (enquiryId: string) => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/enquiry/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId, replyMessage }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.emailSent ? "Reply sent successfully!" : "Reply saved (email not configured)");
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, isRead: true } : e))
        );
        setReplyingTo(null);
        setReplyMessage("");
      } else {
        toast.error(data.error || "Failed to send reply");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {enquiries.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No enquiries yet</p>
          <p className="text-sm mt-1">Enquiries from customers will appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 transition-colors ${
                !enq.isRead
                  ? "bg-gradient-to-r from-yellow-50/50 to-green-50/30 border-l-4 border-l-brand-green"
                  : "hover:bg-gray-50 border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      !enq.isRead
                        ? "bg-gradient-to-br from-yellow-400 to-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {enq.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                      {enq.name}
                      {!enq.isRead && (
                        <span className="text-[10px] font-bold bg-brand-green text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {enq.isRead && (
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      )}
                    </h3>
                    <p className="text-sm font-medium text-brand-green">
                      {enq.productName ? `Inquiring about: ${enq.productName}` : "General Enquiry"}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  <Clock className="w-3 h-3" />
                  {new Date(enq.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 whitespace-pre-wrap text-sm border border-gray-100 leading-relaxed">
                {enq.message}
              </div>

              {/* Contact Info + Reply Button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${enq.email}`} className="hover:text-brand-green hover:underline">
                      {enq.email}
                    </a>
                  </div>
                  {enq.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${enq.phone}`} className="hover:text-brand-green hover:underline">
                        {enq.phone}
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setReplyingTo(replyingTo === enq.id ? null : enq.id);
                    setReplyMessage("");
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-black bg-gradient-to-r from-yellow-400/20 to-green-500/20 hover:from-yellow-400/30 hover:to-green-500/30 px-4 py-2 rounded-lg transition-all"
                >
                  <MessageSquareReply className="w-4 h-4" />
                  {replyingTo === enq.id ? "Cancel" : "Reply"}
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === enq.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder={`Write your reply to ${enq.name}...`}
                      rows={4}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green resize-none transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-400">
                      Replying to <strong>{enq.email}</strong> — a branded email will be sent.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyMessage("");
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReply(enq.id)}
                        disabled={sending || !replyMessage.trim()}
                        className="inline-flex items-center gap-2 bg-brand-black text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Send className="w-4 h-4" />
                        {sending ? "Sending..." : "Send Reply"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
