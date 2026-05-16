import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import WhatsAppWidget from '@/components/WhatsAppWidget/WhatsAppWidget'
import { CONTACT } from '@/lib/contact'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} style={{ display: 'contents' }}>
        {children}
        <WhatsAppWidget phoneNumber={CONTACT.phoneTel} />
      </div>
    </NextIntlClientProvider>
  )
}
