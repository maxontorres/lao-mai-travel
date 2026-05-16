import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone',     title: 'Phone Number (display)',   type: 'string', description: 'e.g. +856 20 7869 0388' }),
    defineField({ name: 'phoneTel',  title: 'Phone (tel: link format)', type: 'string', description: 'No spaces — used in tel: href. e.g. +8562078690388' }),
    defineField({ name: 'email',     title: 'Email Address',            type: 'string' }),
    defineField({ name: 'address_en', title: 'Address (English)',       type: 'string' }),
    defineField({ name: 'address_th', title: 'Address (Thai)',          type: 'string' }),
    defineField({ name: 'hours_en',  title: 'Office Hours (English)',   type: 'string', description: 'e.g. Mon – Sat · 08:00 – 18:00' }),
    defineField({ name: 'hours_th',  title: 'Office Hours (Thai)',      type: 'string' }),
    defineField({ name: 'mapLat',    title: 'Map Latitude',             type: 'number' }),
    defineField({ name: 'mapLng',    title: 'Map Longitude',            type: 'number' }),
    defineField({ name: 'facebookUrl',   title: 'Facebook URL',    type: 'url' }),
    defineField({ name: 'instagramUrl',  title: 'Instagram URL',   type: 'url' }),
    defineField({ name: 'whatsappUrl',   title: 'WhatsApp URL',    type: 'url', description: 'e.g. https://wa.me/8562078690388' }),
    defineField({ name: 'tiktokUrl',     title: 'TikTok URL',      type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
