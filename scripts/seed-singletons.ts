/**
 * Seed all singleton Sanity documents from the original hardcoded content.
 *
 * Prerequisites:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   2. Create a Sanity "Editor" or "Administrator" token and set SANITY_MIGRATION_TOKEN=<token>
 *   3. Run: npx tsx scripts/seed-singletons.ts
 *
 * Safe to run multiple times — uses createOrReplace() on fixed IDs.
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

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docs: any[] = [

    // ─── Site Settings ────────────────────────────────────────────────────────
    {
      _type: 'siteSettings',
      _id:   'siteSettings',
      phone:    '+856 20 7869 0388',
      phoneTel: '+8562078690388',
      email:    'info@laomaitravel.com',
      address_en: 'Ban Viengkham, Sikhottabong District, Vientiane Capital, Lao PDR',
      address_th: 'บ้านเวียงคำ เขตสีโคตตะบอง นครหลวงเวียงจันทน์ สปป.ลาว',
      hours_en: 'Mon – Sat · 08:00 – 18:00',
      hours_th: 'จ. – ส. · 08:00 – 18:00',
      mapLat: 18.029567,
      mapLng: 102.513433,
      // Social URLs: update in Studio once known
      facebookUrl:  null,
      instagramUrl: null,
      whatsappUrl:  'https://wa.me/8562078690388',
      tiktokUrl:    null,
    },

    // ─── Hero Section ─────────────────────────────────────────────────────────
    {
      _type: 'heroSection',
      _id:   'heroSection',
      eyebrow_en:    'VIENTIANE, LAOS',
      titleLine1_en: 'Discover the',
      titleLine2_en: 'Soul of Laos',
      subtitle_en:   'Authentic journeys, trusted local expertise',
      body_en:       'From the golden temples of Vientiane to the misty highlands of the north, Lao Mai Travel crafts immersive experiences that connect you with the true heart of Laos — its people, landscapes, and living traditions.',
      exploreCta_en: 'EXPLORE TOURS',
      planCta_en:    'PLAN YOUR TRIP',
      scroll_en:     'SCROLL',

      eyebrow_th:    'เวียงจันทน์, ลาว',
      titleLine1_th: 'ค้นพบ',
      titleLine2_th: 'จิตวิญญาณแห่งลาว',
      subtitle_th:   'การเดินทางอันแท้จริง ความเชี่ยวชาญท้องถิ่นที่คุณเชื่อถือได้',
      body_th:       'จากวัดทองอร่ามในเวียงจันทน์สู่เทือกเขาหมอกคลุมทางเหนือ เลา ไม ทราเวล สร้างประสบการณ์ที่เปี่ยมด้วยความหมาย เชื่อมต่อคุณกับหัวใจแท้จริงของลาว — ผู้คน ทิวทัศน์ และวิถีประเพณีที่ยังมีชีวิต',
      exploreCta_th: 'สำรวจทัวร์',
      planCta_th:    'วางแผนการเดินทาง',
      scroll_th:     'เลื่อนลง',
    },

    // ─── Tour Packages Section Header ─────────────────────────────────────────
    {
      _type: 'tourPackagesSection',
      _id:   'tourPackagesSection',
      eyebrow_en:     'SIGNATURE ITINERARIES',
      titlePrefix_en: 'Our',
      titleEm_en:     'Tour Packages',
      intro_en:       'Off-the-beaten-path journeys through Laos\' most extraordinary provinces. Each itinerary is led by expert local guides and shaped around authentic encounters with culture, nature, and community.',

      eyebrow_th:     'แผนการเดินทางพิเศษ',
      titlePrefix_th: 'แพ็กเกจ',
      titleEm_th:     'ทัวร์ของเรา',
      intro_th:       'การเดินทางนอกเส้นทางหลักผ่านจังหวัดที่น่าทึ่งที่สุดของลาว ทุกแผนการเดินทางนำโดยไกด์ท้องถิ่นผู้เชี่ยวชาญ และออกแบบมาเพื่อประสบการณ์แท้จริงกับวัฒนธรรม ธรรมชาติ และชุมชน',
    },

    // ─── Destinations Section ─────────────────────────────────────────────────
    {
      _type: 'destinationsSection',
      _id:   'destinationsSection',
      eyebrow_en:    'EXPLORE LAOS',
      titleLine1_en: 'Extraordinary',
      titleLine2_en: 'Destinations',
      desc_en:       'Laos holds some of Southeast Asia\'s most unspoiled landscapes and ancient heritage. Our local guides take you beyond the postcard — into village life, sacred temples, and cascading jungle waterfalls few travelers ever find.',
      modalCta_en:   'PLAN THIS TRIP',

      eyebrow_th:    'สำรวจลาว',
      titleLine1_th: 'จุดหมายปลายทาง',
      titleLine2_th: 'ที่ไม่ธรรมดา',
      desc_th:       'ลาวเป็นที่ตั้งของภูมิทัศน์บริสุทธิ์และมรดกอารยธรรมโบราณที่หาได้ยากในเอเชียตะวันออกเฉียงใต้ ไกด์ท้องถิ่นของเราพาคุณไปเกินกว่าภาพโปสการ์ด — สู่วิถีชีวิตหมู่บ้าน วัดศักดิ์สิทธิ์ และน้ำตกในป่าดงดิบที่นักท่องเที่ยวน้อยคนจะได้สัมผัส',
      modalCta_th:   'วางแผนทริปนี้',

      items: [
        {
          _type: 'destinationItem',
          _key:  'dest-vientiane',
          name_en: 'Vientiane',
          tag_en:  'CAPITAL CITY · TEMPLES · MEKONG',
          description_en: 'The languid capital of Laos sits on a wide bend of the Mekong River, its gilded temples rising above tree-lined boulevards frozen in colonial time. Begin at Pha That Luang — the great golden stupa and national symbol — then wander to Wat Sisaket, the city\'s oldest temple, where thousands of miniature Buddhas line every wall. As the sun drops, join locals along the Mekong promenade and watch the sky turn amber over Thailand on the opposite bank.',
          name_th: 'เวียงจันทน์',
          tag_th:  'เมืองหลวง · วัด · แม่น้ำโขง',
          description_th: 'เมืองหลวงอันเงียบสงบของลาวตั้งอยู่ริมแม่น้ำโขง พร้อมวัดวาอารามทองคำที่ตั้งตระหง่านเหนือถนนสายต้นไม้ที่หยุดนิ่งอยู่ในเวลา เริ่มต้นที่พระธาตุหลวง — สัญลักษณ์ประจำชาติสีทองอร่าม — จากนั้นเดินเที่ยววัดสีสะเกษ วัดที่เก่าแก่ที่สุดในเมือง ที่ซึ่งพระพุทธรูปขนาดเล็กนับพันองค์ประดับทุกผนัง เมื่อยามพระอาทิตย์ตกดิน ร่วมกับชาวบ้านริมฝั่งโขงและชมท้องฟ้าสีทองเหนือฝั่งไทย',
          featured: false,
        },
        {
          _type: 'destinationItem',
          _key:  'dest-luang-prabang',
          name_en: 'Luang Prabang',
          tag_en:  'UNESCO HERITAGE',
          description_en: 'A UNESCO World Heritage city where saffron-robed monks file through misty streets each dawn to collect alms — a ritual unchanged for centuries. Set between the Mekong and Nam Khan rivers, the old quarter is a patchwork of gilded wats, French colonial villas, and night markets scented with lemongrass. Day trips lead to the turquoise cascades of Kuang Si Falls and the sacred Pak Ou Caves, where thousands of Buddha images gaze from ancient riverside cliffs.',
          name_th: 'หลวงพระบาง',
          tag_th:  'มรดกโลกยูเนสโก',
          description_th: 'เมืองมรดกโลกยูเนสโกที่พระภิกษุนุ่งห่มผ้าเหลืองเดินบิณฑบาตในยามเช้าหมอกทุกวัน — ประเพณีที่ไม่เปลี่ยนแปลงมาหลายศตวรรษ ตั้งอยู่ระหว่างแม่น้ำโขงและน้ำคาน ย่านเก่าแก่เต็มไปด้วยวัดทองคำ วิลล่าอาณานิคมฝรั่งเศส และตลาดกลางคืนที่หอมกลิ่นตะไคร้ ทริปวันเดียวพาคุณไปน้ำตกกวางสีสีฟิโรซา และถ้ำปากอูอันศักดิ์สิทธิ์ที่พระพุทธรูปนับพันองค์มองมาจากหน้าผาริมแม่น้ำ',
          featured: true,
        },
        {
          _type: 'destinationItem',
          _key:  'dest-vang-vieng',
          name_en: 'Vang Vieng',
          tag_en:  'KARST MOUNTAINS',
          description_en: 'Dramatic karst limestone peaks rise straight from the Nam Song River, framing a town that has found its balance between adventure and serenity. Kayak through emerald gorges, explore hidden cave systems lit by stalactites, and cycle through rice paddies to remote Hmong villages. At dusk, the peaks turn amber and the riverbanks fill with the quiet hum of tuk-tuks and wood-fire smoke.',
          name_th: 'วังเวียง',
          tag_th:  'ภูเขาหินปูน',
          description_th: 'ยอดเขาหินปูนที่โดดเด่นตั้งตระหง่านจากแม่น้ำซอง เป็นกรอบของเมืองที่ค้นพบความสมดุลระหว่างการผจญภัยและความสงบ พายเรือคายักผ่านหุบเขาสีมรกต สำรวจถ้ำที่ซ่อนอยู่ที่มีหินงอกหินย้อยสวยงาม และขี่จักรยานผ่านทุ่งนาไปยังหมู่บ้านชาวม้งห่างไกล ยามเย็น ยอดเขาเปลี่ยนเป็นสีอำพัน และริมฝั่งแม่น้ำเต็มไปด้วยเสียงตุ๊กตุ๊กและควันไฟจากเตาฟืน',
          featured: false,
        },
        {
          _type: 'destinationItem',
          _key:  'dest-bolaven',
          name_en: 'Bolaven Plateau',
          tag_en:  'COFFEE · WATERFALLS',
          description_en: 'Rising over 1,300 metres above the Mekong lowlands, the Bolaven Plateau is Laos\' coffee heartland — where arabica bushes stretch to the horizon beneath a cool, perpetual mist. Dozens of waterfalls plunge from the plateau\'s edge, including the twin cascades of Tad Fane and the thundering curtain of Tad Lo. Village homestays let you wake to roosters and freshly brewed Lao coffee still warm from the drying racks.',
          name_th: 'ที่ราบสูงโบลาเวน',
          tag_th:  'กาแฟ · น้ำตก',
          description_th: 'ที่ราบสูงโบลาเวนสูงกว่า 1,300 เมตรเหนือพื้นราบแม่น้ำโขง เป็นแหล่งกาแฟหัวใจของลาว — ที่ซึ่งต้นอาราบิก้าทอดยาวสู่ขอบฟ้าใต้ท้องฟ้าหมอกเย็น น้ำตกหลายสิบแห่งไหลทิ้งตัวจากขอบที่ราบสูง รวมถึงน้ำตกคู่ตาดฟาเนและม่านน้ำอันยิ่งใหญ่ของตาดโล การพักโฮมสเตย์ในหมู่บ้านให้คุณตื่นมากับเสียงไก่และกาแฟลาวสดร้อนๆ',
          featured: false,
        },
        {
          _type: 'destinationItem',
          _key:  'dest-4000-islands',
          name_en: '4,000 Islands',
          tag_en:  'MEKONG DELTA',
          description_en: 'At the southern tip of Laos, the Mekong splinters into thousands of islands and sun-dappled channels, creating a slow, timeless world of hammocks, river sunsets, and the elusive Irrawaddy dolphin. Don Det and Don Khon offer riverside guesthouses and bicycle paths through coconut groves. Nearby, the Khone Phapheng Falls — the widest waterfall in Southeast Asia — thunder with extraordinary force, a reminder of the river\'s ancient, unstoppable power.',
          name_th: 'สี่พันดอน',
          tag_th:  'สามเหลี่ยมปากแม่น้ำโขง',
          description_th: 'ที่ปลายสุดทางใต้ของลาว แม่น้ำโขงแตกแขนงออกเป็นเกาะนับพันและลำธารแสงแดด สร้างโลกที่เชื่องช้าและไร้กาลเวลาของเปลญวน ดวงอาทิตย์ตกริมแม่น้ำ และโลมาอิรวดีที่หาดูได้ยาก ดอนเดตและดอนคอนมีที่พักริมแม่น้ำและเส้นทางจักรยานผ่านสวนมะพร้าว ใกล้ๆ กัน น้ำตกคอนพะเพ็ง — น้ำตกที่กว้างที่สุดในเอเชียตะวันออกเฉียงใต้ — คำรามด้วยพลังอันยิ่งใหญ่',
          featured: false,
        },
      ],
    },

    // ─── About Section ────────────────────────────────────────────────────────
    {
      _type: 'aboutSection',
      _id:   'aboutSection',
      eyebrow_en:    'WHO WE ARE',
      titleLine1_en: 'Local Knowledge,',
      titleLine2_en: 'World-Class Service',
      body_en:       'Lao Mai Travel was built on the belief that the most meaningful way to discover Laos is through local insight. We don\'t simply guide you to destinations—we connect you with the heart of our home. Through thoughtfully designed journeys, authentic cultural encounters, and close relationships with local communities, we create experiences that go beyond the surface—allowing you to truly understand the people, traditions, and natural beauty that define Laos',

      eyebrow_th:    'เราคือใคร',
      titleLine1_th: 'ความรู้ท้องถิ่น',
      titleLine2_th: 'บริการระดับโลก',
      body_th:       'Lao Mai Travel ก่อตั้งขึ้นจากความเชื่อที่ว่า วิธีที่เปี่ยมไปด้วยความหมายที่สุดในการค้นพบลาว คือการผ่านมุมมองของคนท้องถิ่น เราไม่ได้เพียงแค่นำทางคุณไปยังจุดหมายปลายทางต่าง ๆ เท่านั้น แต่เราเชื่อมโยงคุณเข้ากับหัวใจของบ้านเกิดของเรา ผ่านการเดินทางที่ออกแบบมาอย่างพิถีพิถัน การสัมผัสวัฒนธรรมที่แท้จริง และความสัมพันธ์ที่ใกล้ชิดกับชุมชนท้องถิ่น เราสร้างสรรค์ประสบการณ์ที่ลึกซึ้งยิ่งกว่าเพียงแค่สิ่งที่เห็นจากภายนอก เพื่อให้คุณได้เข้าถึงผู้คน ประเพณี และความงามทางธรรมชาติที่เป็นเอกลักษณ์ของลาวอย่างแท้จริง',

      badgeNum:      '8+',
      badgeLabel_en: 'YEARS OF\nEXCELLENCE',
      badgeLabel_th: 'ปีแห่ง\nความเป็นเลิศ',

      features: [
        {
          _type:    'feature',
          _key:     'feature-guides',
          icon:     '🧭',
          title_en: 'EXPERT LOCAL GUIDES',
          desc_en:  'All guides are certified, locally born, and speak English and Lao fluently. They know the stories behind every stone.',
          title_th: 'ไกด์ท้องถิ่นผู้เชี่ยวชาญ',
          desc_th:  'ไกด์ทุกคนได้รับการรับรอง เกิดในท้องถิ่น และพูดภาษาอังกฤษและลาวได้อย่างคล่องแคล่ว พวกเขารู้เรื่องราวเบื้องหลังทุกก้อนหิน',
        },
        {
          _type:    'feature',
          _key:     'feature-itineraries',
          icon:     '🗺️',
          title_en: 'TAILORED ITINERARIES',
          desc_en:  'Every journey is crafted around your pace, interests, and travel style — never a cookie-cutter group tour.',
          title_th: 'แผนการเดินทางเฉพาะบุคคล',
          desc_th:  'ทุกการเดินทางถูกออกแบบตามจังหวะ ความสนใจ และสไตล์การท่องเที่ยวของคุณ — ไม่มีทัวร์กลุ่มสำเร็จรูปเลย',
        },
        {
          _type:    'feature',
          _key:     'feature-responsible',
          icon:     '🌿',
          title_en: 'RESPONSIBLE TRAVEL',
          desc_en:  'We partner with local communities, support sustainable practices, and ensure your visit creates a positive impact.',
          title_th: 'การท่องเที่ยวอย่างรับผิดชอบ',
          desc_th:  'เราร่วมมือกับชุมชนท้องถิ่น สนับสนุนแนวปฏิบัติที่ยั่งยืน และรับรองว่าการเยือนของคุณสร้างผลกระทบเชิงบวก',
        },
      ],
    },

    // ─── Panorama Section ─────────────────────────────────────────────────────
    {
      _type: 'panoramaSection',
      _id:   'panoramaSection',
      eyebrow_en:       'ແຜ່ນດິນລ້ານຊ້າງ · THE LAND OF A MILLION ELEPHANTS',
      headlineLine1_en: 'Where',
      headlineEm_en:    'time slows',
      headlineLine2_en: 'and wonder begins',

      eyebrow_th:       'ແຜ່ນດິນລ້ານຊ້າງ · ดินแดนแห่งล้านช้าง',
      headlineLine1_th: 'ที่ซึ่ง',
      headlineEm_th:    'เวลาหยุดนิ่ง',
      headlineLine2_th: 'และความมหัศจรรย์เริ่มต้น',
    },

    // ─── Services Section ─────────────────────────────────────────────────────
    {
      _type: 'servicesSection',
      _id:   'servicesSection',
      eyebrow_en:    'WHAT WE OFFER',
      titleLine1_en: 'Our',
      titleLine2_en: 'Services',
      intro_en:      'Beyond guided tours, we provide end-to-end travel support so every detail of your Laos journey is taken care of.',

      eyebrow_th:    'สิ่งที่เรามอบให้',
      titleLine1_th: 'บริการ',
      titleLine2_th: 'ของเรา',
      intro_th:      'นอกจากทัวร์นำเที่ยว เรายังให้บริการสนับสนุนการเดินทางแบบครบวงจร เพื่อให้ทุกรายละเอียดในการเดินทางของคุณในลาวได้รับการดูแลอย่างครบครัน',

      items: [
        {
          _type:    'serviceItem',
          _key:     'service-accommodation',
          title_en: 'ACCOMMODATION',
          desc_en:  'We arrange comfortable, carefully selected stays — from boutique riverside guesthouses to heritage hotels — matched to your budget and travel style.',
          title_th: 'ที่พัก',
          desc_th:  'เราจัดหาที่พักที่คัดสรรมาอย่างดี ตั้งแต่เกสต์เฮาส์บูติกริมแม่น้ำไปจนถึงโรงแรมมรดก เหมาะกับงบประมาณและสไตล์การเดินทางของคุณ',
        },
        {
          _type:    'serviceItem',
          _key:     'service-ticketing',
          title_en: 'TICKETING',
          desc_en:  'Domestic and international flight bookings, bus passes, and activity tickets handled efficiently so you can focus on the experience, not the logistics.',
          title_th: 'การจองตั๋ว',
          desc_th:  'จองตั๋วเครื่องบินทั้งในประเทศและต่างประเทศ บัตรโดยสาร และตั๋วกิจกรรมต่างๆ อย่างมีประสิทธิภาพ ให้คุณมุ่งเน้นที่ประสบการณ์ ไม่ใช่การจัดการด้านโลจิสติกส์',
        },
        {
          _type:    'serviceItem',
          _key:     'service-transport',
          title_en: 'TRANSPORTATION SERVICE',
          desc_en:  'Private vehicles, airport transfers, boat charters, and tuk-tuks — we coordinate all ground transport throughout your entire Laos journey.',
          title_th: 'บริการขนส่ง',
          desc_th:  'รถยนต์ส่วนตัว การรับส่งสนามบิน เช่าเรือ และตุ๊กตุ๊ก เราประสานงานการขนส่งทางบกทั้งหมดตลอดการเดินทางของคุณในลาว',
        },
      ],
    },

    // ─── Testimonial Section ──────────────────────────────────────────────────
    {
      _type: 'testimonialSection',
      _id:   'testimonialSection',
      quote_en: 'Me and my friends had an amazing time with Lao Mai Travel. They arranged the motorcycles and guided us through the remote northern villages — every day felt like a new adventure. This is how Laos should be explored.',
      quote_th: 'ผมและเพื่อนๆ มีเวลาที่ยอดเยี่ยมมากกับเลา ไม ทราเวล พวกเขาจัดหามอเตอร์ไซค์และพาเราผ่านหมู่บ้านทางเหนือที่ห่างไกล — ทุกวันรู้สึกเหมือนการผจญภัยใหม่ นี่คือวิธีที่ควรสำรวจลาว',
      author:   'MAXIMILIANO BRITO TORRRES · MEXICO CITY, MEXICO',
    },
  ]

  console.log(`Seeding ${docs.length} singleton documents...`)

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ ${doc._id}`)
    } catch (err) {
      console.error(`  ✗ ${doc._id}:`, err)
    }
  }

  console.log('\nDone! Now publish each document in Sanity Studio (or run seed-tours.ts for tour packages).')
}

main()
