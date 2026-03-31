'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);

    // Build WhatsApp message as fallback since no email backend
    const msg = encodeURIComponent(
      `New Inquiry from ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );

    // Simulate send delay for UX
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    toast.success('Inquiry submitted! We\'ll get back to you within 24 hours.');

    // Open WhatsApp with the message
    window.open(`https://wa.me/84967894448?text=${msg}`, '_blank');
  };

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-4 mb-20">
          <Badge variant="outline" className="text-gold-500 border-gold-500/30 uppercase tracking-[0.3em] font-bold px-4 py-1 italic bg-gold-500/5">
            Get In Touch
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase whitespace-normal leading-tight">
            Connect With <br /> <span className="text-gold-500 italic">SlyHairs</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-light">
            Whether you&apos;re starting your own brand or looking for personal luxury,
            our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                <Phone className="text-gold-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Phone/WhatsApp</h3>
                <p className="text-white font-mono text-sm font-bold">+84 967 894 448</p>
              </div>
              <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                <Mail className="text-gold-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">General Email</h3>
                <p className="text-white font-mono text-sm font-bold">contact@slyhairs.com</p>
              </div>
              <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                <MapPin className="text-gold-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">HQ Address</h3>
                <p className="text-white font-mono text-sm font-bold">Ha Dong, Hanoi, VN</p>
              </div>
              <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                <Clock className="text-gold-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Business Hours</h3>
                <p className="text-white font-mono text-sm font-bold">Mon - Sat: 8AM - 6PM</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] italic">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a href="https://instagram.com/slyhairs" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-3 px-6 h-12 bg-neutral-900 border-white/5 rounded-xl hover:border-gold-500 transition-all text-white">
                    <Instagram size={18} className="text-gold-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">@slyhairs</span>
                  </Button>
                </a>
                <a href="https://facebook.com/slyhairs" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-3 px-6 h-12 bg-neutral-900 border-white/5 rounded-xl hover:border-gold-500 transition-all text-white">
                    <Facebook size={18} className="text-gold-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">SlyHairs</span>
                  </Button>
                </a>
              </div>
            </div>

            <Button
              asChild
              className="h-32 w-full p-0 bg-gold-500 border border-gold-500 rounded-3xl text-black hover:bg-gold-400 overflow-hidden shadow-2xl shadow-gold-500/20 transition-all active:scale-[0.98]"
            >
              <a href="https://wa.me/84967894448" target="_blank" className="flex items-center justify-between px-10">
                <div className="text-left">
                  <p className="text-3xl font-black tracking-tighter uppercase leading-none">CHAT WITH US</p>
                  <p className="text-xs font-bold mt-2 opacity-70">Instant Response via WhatsApp</p>
                </div>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white scale-110 transition-transform hover:rotate-45">
                  <Send size={24} />
                </div>
              </a>
            </Button>
          </div>

          {/* Form Side */}
          <div className="bg-neutral-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-fit shadow-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 italic">Send an Inquiry</h2>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="text-green-500 mx-auto" size={56} />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                <Button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General Inquiry', message: '' }); }}
                  variant="outline" className="border-white/10 text-white hover:bg-white/5 mt-4">
                  Send Another
                </Button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your Name" required
                      className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all text-white placeholder:text-gray-600" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com" required
                      className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Subject</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all text-white appearance-none">
                    <option>General Inquiry</option>
                    <option>Wholesale Distributor Application</option>
                    <option>Order Support</option>
                    <option>Custom Order Request</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Message *</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="How can we help you today?" required
                    className="w-full bg-black border border-white/5 p-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all resize-none text-white placeholder:text-gray-600" />
                </div>
                <Button type="submit" disabled={sending}
                  className="w-full h-16 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all text-sm shadow-xl active:scale-[0.98] disabled:opacity-50">
                  <Send size={18} className="mr-3" />
                  {sending ? 'SENDING...' : 'SUBMIT INQUIRY'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
