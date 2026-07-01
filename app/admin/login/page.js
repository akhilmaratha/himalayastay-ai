"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role !== 'admin') {
          setError('Access denied. Admin role required.');
          await fetch('/api/auth/logout', { method: 'POST' });
        } else {
          router.push('/admin');
          router.refresh();
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <div className="bg-[#fcf9f8] font-['Plus_Jakarta_Sans',sans-serif] text-[#1c1b1b] min-h-screen flex flex-col relative overflow-hidden">
        {/* Background Layer */}
        <div className="fixed inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-opacity duration-1000 opacity-40" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1-Fji9Dsxch1SYgUyr8c98MGaKmckrGodnZrDE680hE3Swp-Sqood9QXWxfMHQCKU6I7Riitb77yB9EfMEy69FKe8ooQp6zqdmHZxmOwUtqrIHO-ONcFkbROYFELGnb2vIbTEshYi235_5zyg_ONv47kG_JGjW_U8DVKi8NJY_2LEa0tiywr98ntgbunEMcwd_yr3aeOR4_DhRqD1GfpHcA2GgR_0Kq6ZjuV7vW1bPT3ormOAwb-7EZXGGhadCP2XJqeEmbpGreAG')" }}>
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#fcf9f8]/20 to-[#fcf9f8]/80"></div>
        </div>

        {/* Main Content */}
        <main className="grow flex items-center justify-center px-6 relative z-10 py-[64px]">
          <div className="w-full max-w-[440px]">
            
            {/* Branding Header */}
            <div className="text-center mb-[40px]">
              <h1 className="font-['Playfair_Display',serif] text-[36px] text-[#173124] tracking-tight mb-2">HIMALAYAN STAYS</h1>
              <p className="text-[#424844] uppercase tracking-[0.1em] text-[14px] font-medium">Property Management Portal</p>
            </div>
            
            {/* Login Card */}
            <div className="backdrop-blur-[8px] bg-[rgba(252,249,248,0.9)] border border-[#c2c8c2]/30 rounded-xl p-[24px] md:p-[40px] shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)]">
              <div className="mb-[24px]">
                <h2 className="font-['Playfair_Display',serif] text-[24px] text-[#173124] mb-1">Welcome Back</h2>
                <p className="text-[#424844] text-[14px]">Please enter your credentials to access the dashboard.</p>
              </div>
              
              <form className="space-y-[32px]" onSubmit={handleLogin}>
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                    {error}
                  </div>
                )}
                
                {/* Email Input */}
                <div className="relative pt-4">
                  <input 
                    className="peer border-0 border-b border-[#c2c8c2] bg-transparent transition-colors duration-300 focus:outline-none focus:border-[#173124] focus:ring-0 w-full py-2 text-[#1c1b1b]" 
                    id="email" 
                    placeholder=" " 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="absolute left-0 top-6 text-[#727973] transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-[24px] peer-focus:scale-[0.85] peer-focus:text-[#173124] peer-[:not(:placeholder-shown)]:-translate-y-[24px] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-[#173124]" htmlFor="email">Email Address</label>
                </div>
                
                {/* Password Input */}
                <div className="relative pt-4">
                  <input 
                    className="peer border-0 border-b border-[#c2c8c2] bg-transparent transition-colors duration-300 focus:outline-none focus:border-[#173124] focus:ring-0 w-full py-2 text-[#1c1b1b]" 
                    id="password" 
                    placeholder=" " 
                    required 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="absolute left-0 top-6 text-[#727973] transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-[24px] peer-focus:scale-[0.85] peer-focus:text-[#173124] peer-[:not(:placeholder-shown)]:-translate-y-[24px] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-[#173124]" htmlFor="password">Password</label>
                  <button 
                    type="button" 
                    className="absolute right-0 top-6 text-[#727973] hover:text-[#173124] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px] [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                
                {/* Actions Row */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input className="rounded-sm border-[#c2c8c2] text-[#173124] focus:ring-[#173124] h-4 w-4" type="checkbox" />
                    <span className="text-[14px] text-[#424844] group-hover:text-[#173124] transition-colors">Remember me</span>
                  </label>
                  <a className="text-[14px] text-[#8e4d2e] hover:text-[#173124] transition-colors underline underline-offset-4 decoration-[#c2c8c2]" href="#">Forgot Password?</a>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full bg-[#2d4739] text-[#ffffff] py-4 rounded-lg text-[16px] font-medium hover:bg-[#173124] transition-all duration-300 transform active:scale-[0.98] shadow-[0_4px_20px_-2px_rgba(45,71,57,0.05)] flex items-center justify-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px] [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">progress_activity</span> 
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <span className="material-symbols-outlined text-[18px] [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
              
              {/* Security Assurance */}
              <div className="mt-[40px] pt-[24px] border-t border-[#c2c8c2]/30 flex items-center justify-center gap-2 text-[#727973]">
                <span className="material-symbols-outlined text-[16px] [font-variation-settings:'FILL'_1,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">lock</span>
                <p className="uppercase tracking-widest text-[10px]">Secure Encrypted Connection</p>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 w-full py-[40px] px-6">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[#727973] text-[12px]">
            <p>© 2024 Himalayan Homestays. All rights reserved.</p>
            <div className="flex items-center gap-[24px]">
              <a className="hover:text-[#173124] transition-colors flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[14px] [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">public</span>
                Back to Public Site
              </a>
              <a className="hover:text-[#173124] transition-colors flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[14px] [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] inline-block leading-none normal-case tracking-normal whitespace-nowrap [direction:ltr]">help_outline</span>
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
