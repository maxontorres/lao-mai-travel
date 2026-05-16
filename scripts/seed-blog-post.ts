/**
 * One-time seed: creates the first SEO test blog post in Sanity.
 * Run: npx tsx scripts/seed-blog-post.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_MIGRATION_TOKEN,
})

function block(key: string, style: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

function blocks(...items: [string, string, string][]): object[] {
  return items.map(([k, s, t]) => block(k, s, t))
}

const body_en = [
  block('b01', 'normal',
    'Planning a trip to Laos? Timing is everything. Laos has two distinct seasons — the dry season and the monsoon — each offering a completely different travel experience. This month-by-month guide will help you decide when to visit based on your interests, budget, and the regions you want to explore.'),

  block('b02', 'h2', 'Understanding Laos Weather Patterns'),
  block('b03', 'normal',
    'Laos has a tropical monsoon climate divided into two main seasons: the dry season (November to April) and the wet season (May to October). The country is landlocked, which means temperatures can be more extreme than coastal Southeast Asia — cool evenings in the north and scorching middays in the south during peak dry season.'),

  block('b04', 'h2', 'Best Months to Visit Laos (At a Glance)'),
  block('b05', 'normal',
    '• November–February: Peak season. Ideal weather, lush post-monsoon landscapes, festive atmosphere. Higher prices and more tourists.'),
  block('b06', 'normal',
    '• March–April: Shoulder season. Still dry but hot, especially in the Mekong lowlands. Lao New Year (Pi Mai) in mid-April is a highlight — water festival, parades, and temple ceremonies.'),
  block('b07', 'normal',
    '• May–June: Early wet season. Crowds drop dramatically, prices fall, and the landscape turns intensely green. Rain is intermittent, not all-day.'),
  block('b08', 'normal',
    '• July–September: Peak monsoon. Rivers swell, some rural roads wash out. Best for budget travellers and those who enjoy off-the-beaten-path experiences.'),
  block('b09', 'normal',
    '• October: Transition month. Rains taper off, rivers are still full (great for boat trips), and the That Luang Festival in Vientiane lights up the city.'),

  block('b10', 'h2', 'Month-by-Month Breakdown'),

  block('b11', 'h3', 'November – February: The Sweet Spot'),
  block('b12', 'normal',
    'This four-month window is universally considered the best time to visit Laos. Skies are clear, humidity is low, and temperatures are comfortable — typically 20–28°C during the day. Northern Laos (Luang Prabang, Nong Khiaw) can drop to 10–15°C at night in December and January, making a light jacket essential.'),
  block('b13', 'normal',
    "Luang Prabang's dawn alms-giving ceremony (tak bat) is most atmospheric in the cooler months, with mist rising off the Mekong as saffron-robed monks walk the silent streets. The Boun That Luang festival in Vientiane falls in November — one of the country's most important religious celebrations."),

  block('b14', 'h3', 'March – April: Hot but Festive'),
  block('b15', 'normal',
    "Temperatures climb sharply from March onward, reaching 35–40°C in the Mekong plains. Smoke from agricultural burning can reduce visibility in northern highland areas. However, this is the season for some of Laos' most memorable events."),
  block('b16', 'normal',
    'Lao New Year (Pi Mai Lao) in mid-April is arguably the best single event in the entire Lao calendar. Villages and cities alike erupt into three days of water-throwing, music, sand stupas, and Buddhist rituals. If you can handle the heat, Pi Mai in Luang Prabang is a once-in-a-lifetime experience.'),

  block('b17', 'h3', 'May – June: The Green Season Begins'),
  block('b18', 'normal',
    'The first rains arrive in May, transforming Laos almost overnight from dusty brown to vivid green. Waterfalls — particularly Kuang Si Falls near Luang Prabang and Tad Lo in the Bolaven Plateau — are spectacular during this period. Fewer tourists mean shorter queues, more relaxed village experiences, and significantly lower hotel rates.'),
  block('b19', 'normal',
    'Rain typically falls in intense afternoon or evening showers rather than all-day downpours. Mornings are often clear, making early sightseeing perfectly pleasant.'),

  block('b20', 'h3', 'July – September: Deep Monsoon'),
  block('b21', 'normal',
    'The heart of the wet season brings lush, dramatic scenery but also logistical challenges. Some rural tracks and minor roads in the north and northeast become impassable. Rivers run fast and brown, making certain boat trips inadvisable. That said, experienced travellers who embrace the rain often find this the most rewarding time: guesthouses have vacancies, locals are in great spirits during the planting season, and the countryside looks impossibly green.'),
  block('b22', 'normal',
    'The Vang Vieng area and the 4,000 Islands (Si Phan Don) in the south remain popular year-round, and the river landscape during high-water season has its own dramatic beauty.'),

  block('b23', 'h3', 'October: Festival Season Returns'),
  block('b24', 'normal',
    'October marks the end of Buddhist Lent (Ork Phansa), celebrated with boat races on the Mekong in Vientiane and Luang Prabang. The rain eases to occasional showers, the rivers are still full for scenic boat trips, and the That Luang Festival turns Vientiane\'s most sacred stupa into a week-long celebration with thousands of monks, candlelit processions, and a lively temple fair.'),

  block('b25', 'h2', 'Best Time to Visit by Region'),

  block('b26', 'h3', 'Luang Prabang'),
  block('b27', 'normal',
    'November to February for the best combination of weather, waterfalls, and the magical morning mist. April for Pi Mai. Avoid July–August if you dislike rain, though even then the town is charming.'),

  block('b28', 'h3', 'Vientiane'),
  block('b29', 'normal',
    'The capital is pleasant year-round but truly shines in October–November (festival season). March–April can be brutally hot in this low-lying city. The Mekong riverfront is beautiful after the rains in October.'),

  block('b30', 'h3', 'The Bolaven Plateau & Southern Laos'),
  block('b31', 'normal',
    'The elevated plateau stays cooler than the lowlands and its waterfalls are most impressive from September to November just after peak monsoon. The 4,000 Islands region is a year-round destination; dolphin-spotting (Irrawaddy freshwater dolphins) is best in dry season when water levels are lower.'),

  block('b32', 'h3', 'Northern Highlands (Phongsali, Nong Khiaw, Muang Ngoi)'),
  block('b33', 'normal',
    'November to February for trekking, village homestays, and ethnic minority markets. Cool and clear. May–June is beautiful if you don\'t mind occasional trails being muddy — the scenery of terraced rice fields filling with water is extraordinary.'),

  block('b34', 'h2', 'Practical Tips for Each Season'),
  block('b35', 'normal',
    'Dry season: Book accommodation 2–4 weeks ahead for Luang Prabang from December to February. River cruises from Huay Xai to Luang Prabang (the famous slow boat) are most comfortable in this period.'),
  block('b36', 'normal',
    'Wet season: Pack quick-dry clothing, a good waterproof jacket, and waterproof bags for electronics. Road conditions change fast — always check with your guesthouse about track accessibility before heading off the main routes.'),
  block('b37', 'normal',
    'Year-round: Sun protection is essential. Even in cooler months the tropical sun is strong. Lightweight long sleeves are practical — they keep the sun off and meet temple dress codes.'),

  block('b38', 'h2', 'Our Recommendation'),
  block('b39', 'normal',
    'If you can only visit once, go in November or early December. You get the best of everything: post-monsoon greenery, comfortable temperatures, clear skies, no oppressive heat, and a festive atmosphere as the country emerges from Buddhist Lent. If you want to see Lao New Year, plan for 13–16 April and book well ahead.'),
  block('b40', 'normal',
    'Whatever month you choose, Laos rewards the curious traveller. This is still one of Southeast Asia\'s least-visited countries — and that, in itself, is reason enough to come.'),
]

const body_th = [
  block('t01', 'normal',
    'กำลังวางแผนเที่ยวลาวอยู่ใช่ไหม? จังหวะเวลาสำคัญมาก ลาวมีสองฤดูกาลหลักที่แตกต่างกันอย่างชัดเจน — ฤดูแล้งและฤดูมรสุม — ซึ่งให้ประสบการณ์การท่องเที่ยวที่แตกต่างกันโดยสิ้นเชิง คู่มือรายเดือนนี้จะช่วยให้คุณตัดสินใจได้ว่าควรไปเที่ยวช่วงไหนตามความสนใจ งบประมาณ และภูมิภาคที่ต้องการสำรวจ'),

  block('t02', 'h2', 'ทำความเข้าใจสภาพอากาศของลาว'),
  block('t03', 'normal',
    'ลาวมีภูมิอากาศแบบมรสุมเขตร้อน แบ่งเป็นสองฤดูหลัก: ฤดูแล้ง (พฤศจิกายน–เมษายน) และฤดูฝน (พฤษภาคม–ตุลาคม) เนื่องจากลาวเป็นประเทศไม่มีทางออกสู่ทะเล อุณหภูมิจึงอาจเปลี่ยนแปลงมากกว่าประเทศชายฝั่งในเอเชียตะวันออกเฉียงใต้'),

  block('t04', 'h2', 'ช่วงเวลาที่ดีที่สุดในการเยือนลาว'),
  block('t05', 'normal',
    '• พฤศจิกายน–กุมภาพันธ์: ฤดูท่องเที่ยวสูงสุด อากาศเหมาะสม ทัศนียภาพเขียวขจีหลังมรสุม บรรยากาศเทศกาล ราคาสูงกว่าและนักท่องเที่ยวมากกว่า'),
  block('t06', 'normal',
    '• มีนาคม–เมษายน: ช่วงไหล่ฤดู ยังแห้งแต่ร้อน โดยเฉพาะในพื้นที่ลุ่มแม่น้ำโขง ปีใหม่ลาว (ปีใหม่) ในกลางเดือนเมษายนเป็นไฮไลต์สำคัญ — เทศกาลสาดน้ำ ขบวนแห่ และพิธีกรรมที่วัด'),
  block('t07', 'normal',
    '• พฤษภาคม–มิถุนายน: ต้นฤดูฝน จำนวนนักท่องเที่ยวลดลงอย่างมาก ราคาลดลง และภูมิทัศน์เปลี่ยนเป็นสีเขียวสด ฝนตกเป็นช่วงๆ ไม่ใช่ตลอดวัน'),
  block('t08', 'normal',
    '• กรกฎาคม–กันยายน: มรสุมสูงสุด เหมาะสำหรับนักท่องเที่ยวที่ประหยัดงบและชื่นชอบประสบการณ์ห่างไกลจากเส้นทางหลัก'),
  block('t09', 'normal',
    '• ตุลาคม: เดือนเปลี่ยนผ่าน ฝนลดลง แม่น้ำยังเต็มฝั่ง (เหมาะสำหรับล่องเรือ) และเทศกาลทัดหลวงในเวียงจันทน์'),

  block('t10', 'h2', 'คำแนะนำของเรา'),
  block('t11', 'normal',
    'หากคุณมีโอกาสเยือนลาวได้เพียงครั้งเดียว ขอแนะนำให้ไปในเดือนพฤศจิกายนหรือต้นเดือนธันวาคม คุณจะได้สัมผัสสิ่งที่ดีที่สุดทั้งหมด: ทัศนียภาพเขียวขจีหลังมรสุม อุณหภูมิสบาย ท้องฟ้าแจ่มใส ไม่ร้อนอบอ้าว และบรรยากาศเทศกาลที่คึกคัก หากต้องการเข้าร่วมเทศกาลปีใหม่ลาว ควรวางแผนสำหรับวันที่ 13–16 เมษายน และจองล่วงหน้า'),
  block('t12', 'normal',
    'ไม่ว่าคุณจะเลือกมาในเดือนใด ลาวจะตอบแทนนักท่องเที่ยวที่ใฝ่รู้เสมอ นี่ยังคงเป็นหนึ่งในประเทศที่มีนักท่องเที่ยวน้อยที่สุดในเอเชียตะวันออกเฉียงใต้ — และนั่นเอง คือเหตุผลที่ควรมา'),
]

const post = {
  _id: 'post-best-time-to-visit-laos',
  _type: 'post',
  slug: { _type: 'slug', current: 'best-time-to-visit-laos' },
  publishedAt: '2025-05-01T08:00:00.000Z',

  title_en: 'Best Time to Visit Laos: A Month-by-Month Travel Guide',
  excerpt_en: 'Wondering when to visit Laos? From the cool, clear skies of November to the vibrant Lao New Year water festival in April, this month-by-month guide covers weather, festivals, and regional tips to help you plan the perfect trip.',
  body_en,
  seoTitle_en: 'Best Time to Visit Laos: Month-by-Month Guide (2025)',
  seoDescription_en: 'Plan your Laos trip with confidence. Our month-by-month guide covers weather, top festivals like Pi Mai Lao, waterfalls, and regional travel tips for Luang Prabang, Vientiane, and beyond.',

  title_th: 'ช่วงเวลาที่ดีที่สุดในการเที่ยวลาว: คู่มือรายเดือน',
  excerpt_th: 'สงสัยว่าควรไปเที่ยวลาวช่วงไหนดี? ตั้งแต่ท้องฟ้าแจ่มใสในเดือนพฤศจิกายนไปจนถึงเทศกาลสาดน้ำปีใหม่ลาวในเมษายน คู่มือรายเดือนนี้ครอบคลุมสภาพอากาศ เทศกาล และเคล็ดลับตามภูมิภาคเพื่อช่วยคุณวางแผนทริปที่สมบูรณ์แบบ',
  body_th,
  seoTitle_th: 'ช่วงเวลาที่ดีที่สุดในการเที่ยวลาว (2025)',
  seoDescription_th: 'วางแผนทริปลาวอย่างมั่นใจ คู่มือรายเดือนของเราครอบคลุมสภาพอากาศ เทศกาลสำคัญอย่างปีใหม่ลาว น้ำตก และเคล็ดลับการท่องเที่ยวตามภูมิภาคสำหรับหลวงพระบาง เวียงจันทน์ และอื่นๆ',
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
    process.exit(1)
  }
  if (!process.env.SANITY_MIGRATION_TOKEN) {
    console.error('Missing SANITY_MIGRATION_TOKEN in .env.local')
    process.exit(1)
  }

  console.log('Seeding blog post to Sanity project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  const result = await client.createOrReplace(post)
  console.log('✓ Blog post created:', result._id)
  console.log('  Slug:', (result as any).slug?.current)
  console.log('  Title:', (result as any).title_en)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
