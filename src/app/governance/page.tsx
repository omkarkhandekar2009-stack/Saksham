'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { i18n, localizeNumber } from '@/lib/i18n';
import { Landmark, HandHeart, ExternalLink, CheckCircle2, MapPin, Compass, ShieldCheck, GraduationCap } from 'lucide-react';

const governmentSchemes = [
  {
    name: 'Swami Vivekanand Nishakt Swavlamban Protsahan Yojana',
    authority: 'Government of Jharkhand · Social Security',
    summary: 'State social-security assistance intended to support eligible Jharkhand residents with disabilities and promote independent living with dignity.',
    eligibility: 'Jharkhand residents aged 5 years or above who fall within a disability category recognized under the Rights of Persons with Disabilities Act, 2016. Final eligibility is verified by the department.',
    access: 'Apply through JharSewa or the relevant district/block social-security office with identity, residence, disability and bank documents.',
    href: 'https://jharsewa.jharkhand.gov.in/',
  },
  {
    name: 'Indira Gandhi National Disability Pension Scheme',
    authority: 'NSAP · Implemented through Jharkhand Social Security',
    summary: 'Monthly pension support for eligible persons with severe disabilities from economically vulnerable households, delivered through the state social-security system.',
    eligibility: 'Disability, age and household eligibility are assessed under current NSAP and Jharkhand social-security rules. Applicants should confirm the latest criteria before applying.',
    access: 'Use the Jharkhand social-security pension service on JharSewa or contact the district social-security cell.',
    href: 'https://jharsewa.jharkhand.gov.in/getServiceDesc.html?backButtonUrl=&grievDefined=1&serviceId=3590001&state=20&tempId=&templStatus=',
  },
  {
    name: 'Scholarship Support for Students with Disabilities',
    authority: 'Women, Child Development & Social Security Department',
    summary: 'State-budgeted scholarship and stipend support designed to reduce education-related barriers for students with disabilities in Jharkhand.',
    eligibility: 'Students should verify the current academic-year notification, disability certification, income conditions and institution requirements with the district social-welfare office.',
    access: 'Check department and JharSewa notices or approach the District Social Welfare Officer for the active application cycle.',
    href: 'https://www.jharkhand.gov.in/wcd',
  },
];

const ngoPrograms = [
  {
    name: 'Deepshikha — Institute for Child Development & Mental Health',
    location: 'Ranchi, Jharkhand',
    focus: 'Children and young people with developmental disabilities',
    programs: ['Special school, preschool and individualized education plans', 'Early intervention, speech/occupational therapy and autism support', 'Deafblindness and multi-sensory support through SPARSH', 'Adult skill training, family guidance and community outreach'],
    href: 'https://deepshikhaindia.org/',
  },
  {
    name: 'Jharkhand Parents Association — Koshish Special School',
    location: 'Argora, Ranchi',
    focus: 'Children with intellectual disabilities and autism',
    programs: ['Tailored special education and inclusive learning support', 'Skill development for independence and confidence', 'Social learning, communication and adaptive-life skills', 'Parent engagement, disability awareness and self-care development'],
    href: 'https://www.koshishfoundation.org.in/',
  },
  {
    name: 'Cheshire Homes India — Ranchi',
    location: 'Bariatu, Ranchi',
    focus: 'Children and adults with physical and multiple disabilities',
    programs: ['Residential care, food, clothing, education and medical support', 'Community-based rehabilitation for children living in poverty', 'Assistive support and daily-living development', 'Skills training and livelihood preparation for young people with disabilities'],
    href: 'https://cheshirehomesindia.com/',
  },
  {
    name: 'Brajkishore Netraheen Balika Vidyalaya',
    location: 'Baragain, Ranchi',
    focus: 'Blind and visually impaired girls, including tribal and low-income students',
    programs: ['Free residential education from kindergarten through Class 12', 'Braille, tactile and audio-based learning support', 'NIOS and IGNOU pathways for school and higher education', 'Computer literacy, call-centre training and independent-living skills'],
    href: 'https://www.bnbv.org/',
  },
  {
    name: 'Pahela Kadam — School for Special Children',
    location: 'Saraidhela, Dhanbad',
    focus: 'Children with intellectual, sensory, physical and developmental disabilities',
    programs: ['Special education and individualized developmental support', 'Speech, occupational and physical therapies', 'Sensory integration and early developmental care', 'Adaptive vocational training and daily-life independence'],
    href: 'https://pahelakadam.in/',
  },
  {
    name: 'Chotanagpur Sanskritik Sangh',
    location: 'Ranchi and neighboring rural blocks',
    focus: 'Community inclusion, rehabilitation and livelihoods for persons with disabilities',
    programs: ['Community-based rehabilitation and inclusive development', 'Connections to education, healthcare and government entitlements', 'Livelihood training and support for inclusive self-help groups', 'Disability-rights awareness and local organization building'],
    href: 'https://www.css.org.in/rehabilitation.php',
  },
];

export default function GovernancePage() {
  const { language } = useAppStore();
  const t = i18n[language] || i18n.hi;

  return (
    <div className="space-y-10 py-2">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-[#173b76] via-[#0f2b5c] to-[#0a1f42] px-6 py-8 sm:px-8 shadow-2xl">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-[#081a3b]/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
              <Compass className="h-3.5 w-3.5" /> {language === 'hi' ? 'झारखंड सहायता निर्देशिका' : language === 'mr' ? 'झारखंड सहाय्य निर्देशिका' : 'Jharkhand Support Directory'}
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t.govHeroTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100">
              {t.govHeroSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="min-w-20 rounded-2xl border border-white/10 bg-[#081a3b]/70 p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-black text-cyan-300">{localizeNumber(governmentSchemes.length, language)}</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-blue-200">{language === 'hi' ? 'योजनाएं' : language === 'mr' ? 'योजना' : 'Schemes'}</div>
            </div>
            <div className="min-w-20 rounded-2xl border border-white/10 bg-[#081a3b]/70 p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-black text-emerald-300">{localizeNumber(ngoPrograms.length, language)}</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-blue-200">{language === 'hi' ? 'संस्थाएं' : language === 'mr' ? 'संस्था' : 'NGOs'}</div>
            </div>
            <div className="min-w-20 rounded-2xl border border-white/10 bg-[#081a3b]/70 p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-black text-white">{localizeNumber(4, language)}+</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-blue-200">{language === 'hi' ? 'जिले' : language === 'mr' ? 'जिल्हे' : 'Districts'}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="jharkhand-schemes-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Landmark className="w-4 h-4" /> {language === 'hi' ? 'झारखंड सरकार सहायता' : language === 'mr' ? 'झारखंड शासन सहाय्य' : 'Jharkhand Government Support'}
            </div>
            <h2 id="jharkhand-schemes-heading" className="text-2xl font-black text-white mt-1">
              {language === 'hi' ? 'दिव्यांग योजनाएं व छात्रवृत्ति' : language === 'mr' ? 'दिव्यांग योजना आणि शिष्यवृत्ती' : 'Disability Schemes & Student Support Pathways'}
            </h2>
            <p className="text-sm text-blue-200 mt-1 max-w-3xl">
              {language === 'hi'
                ? 'वित्तीय सहायता और शिक्षा सहयोग हेतु सत्यापित सरकारी योजनाएं। लाभ राशि व पात्रता संबंधी आधिकारिक लिंक से पुष्टि करें।'
                : language === 'mr'
                ? 'आर्थिक सहाय्य आणि शिक्षण मदतीसाठी पडताळणी केलेल्या सरकारी योजना. लाभ रक्कम आणि पात्रतेसाठी अधिकृत लिंक तपासा.'
                : 'Verified starting points for financial assistance and education support. Benefit amounts and application windows can change, so use the official link to confirm current rules.'}
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-full px-3 py-1.5">
            {language === 'hi' ? 'आधिकारिक स्रोत समीक्षा · अगस्त २०२६' : language === 'mr' ? 'अधिकृत स्रोत आढावा · ऑगस्ट २०२६' : 'Official sources reviewed · August 2026'}
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {governmentSchemes.map((scheme) => (
            <article key={scheme.name} className="group relative overflow-hidden bg-gradient-to-b from-[#12366f] to-[#0f2b5c] border border-cyan-500/30 rounded-3xl p-5 shadow-xl flex flex-col transition hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-cyan-950/50">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
                  <Landmark className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-[9px] uppercase tracking-wider font-black text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  {language === 'hi' ? 'सरकारी' : language === 'mr' ? 'शासकीय' : 'Government'}
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-4 leading-snug">{scheme.name}</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 mt-1">{scheme.authority}</p>
              <p className="text-xs leading-relaxed text-blue-100 mt-3">{scheme.summary}</p>
              <div className="mt-4 space-y-3 text-xs">
                <div className="bg-[#081a3b] border border-blue-400/20 rounded-xl p-3">
                  <div className="font-bold text-white mb-1">{language === 'hi' ? 'पात्रता व सहायता' : language === 'mr' ? 'पात्रता आणि सहाय्य' : 'Who it supports'}</div>
                  <p className="text-blue-200 leading-relaxed">{scheme.eligibility}</p>
                </div>
                <div className="flex gap-2 text-blue-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{scheme.access}</span>
                </div>
              </div>
              <a href={scheme.href} target="_blank" rel="noreferrer" className="mt-auto pt-5 text-xs font-black text-cyan-300 group-hover:text-white inline-flex items-center gap-1.5">
                {language === 'hi' ? 'आधिकारिक पोर्टल खोलें' : language === 'mr' ? 'अधिकृत पोर्टल उघडा' : 'Open official information'} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="jharkhand-ngos-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <HandHeart className="w-4 h-4" /> {language === 'hi' ? 'सामुदायिक सहायता नेटवर्क' : language === 'mr' ? 'समुदाय सहाय्य नेटवर्क' : 'Community Support Network'}
            </div>
            <h2 id="jharkhand-ngos-heading" className="text-2xl font-black text-white mt-1">
              {language === 'hi' ? 'झारखंड में कार्यरत दिव्यांग सहायता संस्थाएं (NGOs)' : language === 'mr' ? 'झारखंडमधील दिव्यांग सहाय्य संस्था (NGOs)' : 'Jharkhand NGOs Supporting Children & Students'}
            </h2>
            <p className="text-sm text-blue-200 mt-1">
              {language === 'hi'
                ? 'शिक्षा, थेरेपी, पुनर्वास, पारिवारिक परामर्श और आत्मनिर्भरता हेतु अग्रणी संस्थाएं।'
                : language === 'mr'
                ? 'शिक्षण, थेरपी, पुनर्वसन, कौटुंबिक मार्गदर्शन आणि स्वावलंबनासाठी प्रमुख संस्था.'
                : 'Education, therapy, rehabilitation, family support and pathways toward independence.'}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-[10px] font-bold text-emerald-200">
            <ShieldCheck className="h-4 w-4" /> {language === 'hi' ? 'संस्था पोर्टल सत्यापित' : language === 'mr' ? 'संस्था पोर्टल सत्यापित' : 'Organization websites reviewed'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ngoPrograms.map((ngo, index) => (
            <article key={ngo.name} className="group flex flex-col overflow-hidden bg-[#0f2b5c] border border-emerald-500/25 rounded-3xl shadow-xl transition hover:-translate-y-1 hover:border-emerald-300/60">
              <div className={`h-1.5 ${index % 3 === 0 ? 'bg-cyan-400' : index % 3 === 1 ? 'bg-emerald-400' : 'bg-blue-500'}`} />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-300">
                    <MapPin className="w-3.5 h-3.5" /> {ngo.location}
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="text-base font-black text-white mt-3 leading-snug min-h-10">{ngo.name}</h3>
                <p className="mt-3 rounded-xl border border-cyan-400/15 bg-[#081a3b]/70 px-3 py-2 text-[11px] leading-relaxed text-cyan-200">{ngo.focus}</p>
                <ul className="space-y-2.5 mt-4">
                  {ngo.programs.map((program) => (
                    <li key={program} className="flex gap-2 text-xs text-blue-100 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{program}</span>
                    </li>
                  ))}
                </ul>
                <a href={ngo.href} target="_blank" rel="noreferrer" className="mt-auto pt-5 text-xs font-black text-emerald-300 group-hover:text-white inline-flex items-center gap-1.5">
                  {language === 'hi' ? 'संस्था की वेबसाइट देखें' : language === 'mr' ? 'संस्थेची वेबसाइट पहा' : 'Visit organization website'} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
