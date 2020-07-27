const langs = [
  {
    iso_lang: 'es_ES',
    slug: 'es',
    code: 'ESP',
    label: 'Español'
  },
  {
    iso_lang: 'en_EN',
    slug: 'en',
    code: 'ENG',
    label: 'English'
  }
]

const countries = [
  {name: 'Afghanistan', code: 'AF'},
  {name: 'Åland Islands', code: 'AX'},
  {name: 'Albania', code: 'AL'},
  {name: 'Algeria', code: 'DZ'},
  {name: 'American Samoa', code: 'AS'},
  {name: 'AndorrA', code: 'AD'},
  {name: 'Angola', code: 'AO'},
  {name: 'Anguilla', code: 'AI'},
  {name: 'Antarctica', code: 'AQ'},
  {name: 'Antigua and Barbuda', code: 'AG'},
  {name: 'Argentina', code: 'AR'},
  {name: 'Armenia', code: 'AM'},
  {name: 'Aruba', code: 'AW'},
  {name: 'Australia', code: 'AU'},
  {name: 'Austria', code: 'AT'},
  {name: 'Azerbaijan', code: 'AZ'},
  {name: 'Bahamas', code: 'BS'},
  {name: 'Bahrain', code: 'BH'},
  {name: 'Bangladesh', code: 'BD'},
  {name: 'Barbados', code: 'BB'},
  {name: 'Belarus', code: 'BY'},
  {name: 'Belgium', code: 'BE'},
  {name: 'Belize', code: 'BZ'},
  {name: 'Benin', code: 'BJ'},
  {name: 'Bermuda', code: 'BM'},
  {name: 'Bhutan', code: 'BT'},
  {name: 'Bolivia', code: 'BO'},
  {name: 'Bosnia and Herzegovina', code: 'BA'},
  {name: 'Botswana', code: 'BW'},
  {name: 'Bouvet Island', code: 'BV'},
  {name: 'Brazil', code: 'BR'},
  {name: 'British Indian Ocean Territory', code: 'IO'},
  {name: 'Brunei Darussalam', code: 'BN'},
  {name: 'Bulgaria', code: 'BG'},
  {name: 'Burkina Faso', code: 'BF'},
  {name: 'Burundi', code: 'BI'},
  {name: 'Cambodia', code: 'KH'},
  {name: 'Cameroon', code: 'CM'},
  {name: 'Canada', code: 'CA'},
  {name: 'Cape Verde', code: 'CV'},
  {name: 'Cayman Islands', code: 'KY'},
  {name: 'Central African Republic', code: 'CF'},
  {name: 'Chad', code: 'TD'},
  {name: 'Chile', code: 'CL'},
  {name: 'China', code: 'CN'},
  {name: 'Christmas Island', code: 'CX'},
  {name: 'Cocos (Keeling) Islands', code: 'CC'},
  {name: 'Colombia', code: 'CO'},
  {name: 'Comoros', code: 'KM'},
  {name: 'Congo', code: 'CG'},
  {name: 'Congo, The Democratic Republic of the', code: 'CD'},
  {name: 'Cook Islands', code: 'CK'},
  {name: 'Costa Rica', code: 'CR'},
  {name: 'Cote D\'Ivoire', code: 'CI'},
  {name: 'Croatia', code: 'HR'},
  {name: 'Cuba', code: 'CU'},
  {name: 'Cyprus', code: 'CY'},
  {name: 'Czech Republic', code: 'CZ'},
  {name: 'Denmark', code: 'DK'},
  {name: 'Djibouti', code: 'DJ'},
  {name: 'Dominica', code: 'DM'},
  {name: 'Dominican Republic', code: 'DO'},
  {name: 'Ecuador', code: 'EC'},
  {name: 'Egypt', code: 'EG'},
  {name: 'El Salvador', code: 'SV'},
  {name: 'Equatorial Guinea', code: 'GQ'},
  {name: 'Eritrea', code: 'ER'},
  {name: 'Estonia', code: 'EE'},
  {name: 'Ethiopia', code: 'ET'},
  {name: 'Falkland Islands (Malvinas)', code: 'FK'},
  {name: 'Faroe Islands', code: 'FO'},
  {name: 'Fiji', code: 'FJ'},
  {name: 'Finland', code: 'FI'},
  {name: 'France', code: 'FR'},
  {name: 'French Guiana', code: 'GF'},
  {name: 'French Polynesia', code: 'PF'},
  {name: 'French Southern Territories', code: 'TF'},
  {name: 'Gabon', code: 'GA'},
  {name: 'Gambia', code: 'GM'},
  {name: 'Georgia', code: 'GE'},
  {name: 'Germany', code: 'DE'},
  {name: 'Ghana', code: 'GH'},
  {name: 'Gibraltar', code: 'GI'},
  {name: 'Greece', code: 'GR'},
  {name: 'Greenland', code: 'GL'},
  {name: 'Grenada', code: 'GD'},
  {name: 'Guadeloupe', code: 'GP'},
  {name: 'Guam', code: 'GU'},
  {name: 'Guatemala', code: 'GT'},
  {name: 'Guernsey', code: 'GG'},
  {name: 'Guinea', code: 'GN'},
  {name: 'Guinea-Bissau', code: 'GW'},
  {name: 'Guyana', code: 'GY'},
  {name: 'Haiti', code: 'HT'},
  {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
  {name: 'Holy See (Vatican City State)', code: 'VA'},
  {name: 'Honduras', code: 'HN'},
  {name: 'Hong Kong', code: 'HK'},
  {name: 'Hungary', code: 'HU'},
  {name: 'Iceland', code: 'IS'},
  {name: 'India', code: 'IN'},
  {name: 'Indonesia', code: 'ID'},
  {name: 'Iran, Islamic Republic Of', code: 'IR'},
  {name: 'Iraq', code: 'IQ'},
  {name: 'Ireland', code: 'IE'},
  {name: 'Isle of Man', code: 'IM'},
  {name: 'Israel', code: 'IL'},
  {name: 'Italy', code: 'IT'},
  {name: 'Jamaica', code: 'JM'},
  {name: 'Japan', code: 'JP'},
  {name: 'Jersey', code: 'JE'},
  {name: 'Jordan', code: 'JO'},
  {name: 'Kazakhstan', code: 'KZ'},
  {name: 'Kenya', code: 'KE'},
  {name: 'Kiribati', code: 'KI'},
  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
  {name: 'Korea, Republic of', code: 'KR'},
  {name: 'Kuwait', code: 'KW'},
  {name: 'Kyrgyzstan', code: 'KG'},
  {name: 'Lao People\'S Democratic Republic', code: 'LA'},
  {name: 'Latvia', code: 'LV'},
  {name: 'Lebanon', code: 'LB'},
  {name: 'Lesotho', code: 'LS'},
  {name: 'Liberia', code: 'LR'},
  {name: 'Libyan Arab Jamahiriya', code: 'LY'},
  {name: 'Liechtenstein', code: 'LI'},
  {name: 'Lithuania', code: 'LT'},
  {name: 'Luxembourg', code: 'LU'},
  {name: 'Macao', code: 'MO'},
  {name: 'Macedonia, Former Yugoslav Republic of', code: 'MK'},
  {name: 'Madagascar', code: 'MG'},
  {name: 'Malawi', code: 'MW'},
  {name: 'Malaysia', code: 'MY'},
  {name: 'Maldives', code: 'MV'},
  {name: 'Mali', code: 'ML'},
  {name: 'Malta', code: 'MT'},
  {name: 'Marshall Islands', code: 'MH'},
  {name: 'Martinique', code: 'MQ'},
  {name: 'Mauritania', code: 'MR'},
  {name: 'Mauritius', code: 'MU'},
  {name: 'Mayotte', code: 'YT'},
  {name: 'Mexico', code: 'MX'},
  {name: 'Micronesia, Federated States of', code: 'FM'},
  {name: 'Moldova, Republic of', code: 'MD'},
  {name: 'Monaco', code: 'MC'},
  {name: 'Mongolia', code: 'MN'},
  {name: 'Montserrat', code: 'MS'},
  {name: 'Morocco', code: 'MA'},
  {name: 'Mozambique', code: 'MZ'},
  {name: 'Myanmar', code: 'MM'},
  {name: 'Namibia', code: 'NA'},
  {name: 'Nauru', code: 'NR'},
  {name: 'Nepal', code: 'NP'},
  {name: 'Netherlands', code: 'NL'},
  {name: 'Netherlands Antilles', code: 'AN'},
  {name: 'New Caledonia', code: 'NC'},
  {name: 'New Zealand', code: 'NZ'},
  {name: 'Nicaragua', code: 'NI'},
  {name: 'Niger', code: 'NE'},
  {name: 'Nigeria', code: 'NG'},
  {name: 'Niue', code: 'NU'},
  {name: 'Norfolk Island', code: 'NF'},
  {name: 'Northern Mariana Islands', code: 'MP'},
  {name: 'Norway', code: 'NO'},
  {name: 'Oman', code: 'OM'},
  {name: 'Pakistan', code: 'PK'},
  {name: 'Palau', code: 'PW'},
  {name: 'Palestinian Territory, Occupied', code: 'PS'},
  {name: 'Panama', code: 'PA'},
  {name: 'Papua New Guinea', code: 'PG'},
  {name: 'Paraguay', code: 'PY'},
  {name: 'Peru', code: 'PE'},
  {name: 'Philippines', code: 'PH'},
  {name: 'Pitcairn', code: 'PN'},
  {name: 'Poland', code: 'PL'},
  {name: 'Portugal', code: 'PT'},
  {name: 'Puerto Rico', code: 'PR'},
  {name: 'Qatar', code: 'QA'},
  {name: 'Reunion', code: 'RE'},
  {name: 'Romania', code: 'RO'},
  {name: 'Russian Federation', code: 'RU'},
  {name: 'RWANDA', code: 'RW'},
  {name: 'Saint Helena', code: 'SH'},
  {name: 'Saint Kitts and Nevis', code: 'KN'},
  {name: 'Saint Lucia', code: 'LC'},
  {name: 'Saint Pierre and Miquelon', code: 'PM'},
  {name: 'Saint Vincent and the Grenadines', code: 'VC'},
  {name: 'Samoa', code: 'WS'},
  {name: 'San Marino', code: 'SM'},
  {name: 'Sao Tome and Principe', code: 'ST'},
  {name: 'Saudi Arabia', code: 'SA'},
  {name: 'Senegal', code: 'SN'},
  {name: 'Serbia and Montenegro', code: 'CS'},
  {name: 'Seychelles', code: 'SC'},
  {name: 'Sierra Leone', code: 'SL'},
  {name: 'Singapore', code: 'SG'},
  {name: 'Slovakia', code: 'SK'},
  {name: 'Slovenia', code: 'SI'},
  {name: 'Solomon Islands', code: 'SB'},
  {name: 'Somalia', code: 'SO'},
  {name: 'South Africa', code: 'ZA'},
  {name: 'South Georgia and Sandwich Islands', code: 'GS'},
  {name: 'Spain', code: 'ES'},
  {name: 'Sri Lanka', code: 'LK'},
  {name: 'Sudan', code: 'SD'},
  {name: 'Suriname', code: 'SR'},
  {name: 'Svalbard and Jan Mayen', code: 'SJ'},
  {name: 'Swaziland', code: 'SZ'},
  {name: 'Sweden', code: 'SE'},
  {name: 'Switzerland', code: 'CH'},
  {name: 'Syrian Arab Republic', code: 'SY'},
  {name: 'Taiwan, Province of China', code: 'TW'},
  {name: 'Tajikistan', code: 'TJ'},
  {name: 'Tanzania, United Republic of', code: 'TZ'},
  {name: 'Thailand', code: 'TH'},
  {name: 'Timor-Leste', code: 'TL'},
  {name: 'Togo', code: 'TG'},
  {name: 'Tokelau', code: 'TK'},
  {name: 'Tonga', code: 'TO'},
  {name: 'Trinidad and Tobago', code: 'TT'},
  {name: 'Tunisia', code: 'TN'},
  {name: 'Turkey', code: 'TR'},
  {name: 'Turkmenistan', code: 'TM'},
  {name: 'Turks and Caicos Islands', code: 'TC'},
  {name: 'Tuvalu', code: 'TV'},
  {name: 'Uganda', code: 'UG'},
  {name: 'Ukraine', code: 'UA'},
  {name: 'United Arab Emirates', code: 'AE'},
  {name: 'United Kingdom', code: 'GB'},
  {name: 'United States', code: 'US'},
  {name: 'United States Minor Outlying Islands', code: 'UM'},
  {name: 'Uruguay', code: 'UY'},
  {name: 'Uzbekistan', code: 'UZ'},
  {name: 'Vanuatu', code: 'VU'},
  {name: 'Venezuela', code: 'VE'},
  {name: 'Viet Nam', code: 'VN'},
  {name: 'Virgin Islands, British', code: 'VG'},
  {name: 'Virgin Islands, U.S.', code: 'VI'},
  {name: 'Wallis and Futuna', code: 'WF'},
  {name: 'Western Sahara', code: 'EH'},
  {name: 'Yemen', code: 'YE'},
  {name: 'Zambia', code: 'ZM'},
  {name: 'Zimbabwe', code: 'ZW'}
]

const faqs = {
  'es_ES': [
    {
      question: '¿Cómo se diferencia MAP IT de los demás?',
      answer: 'Somos una empresa enfocada en el desarrollo sostenible del Perú, que busca generar un cambio a través del turismo. Las experiencias son diferentes a las convencionales: te permiten descubrir la ciudad como una persona local, disfrutando de su verdadera escencia. Gracias a esto, apoyamos a las comunidades rurales con proyectos, preservamos sus tradiciones, y generamos ingresos para los locales.'
    },
    {
      question: '¿Las experiencias son seguras?',
      answer: 'Sí lo son. Todas las experiencias han sido probadas con estándares de seguridad, y son supervisadas periódicamente.'
    },
    {
      question: '¿Cómo reservo una experiencia?',
      answer: 'Revisa la sección: "Cómo funciona" para más información en como reservar una experiencia en MAP IT.'
    },
    {
      question: '¿Puedo personalizar una experiencia?',
      answer: '¡Claro! En caso quieras hacerlo, contáctanos por correo electrónico para cotizar alguna experiencia a tu medida.'
    },
    {
      question: 'Viajo solo ¿Puedo unirme a sus experiencias?',
      answer: 'Sí, en caso requiera un grupo mínimo, mándanos un correo; la podrías reservar con un recargo, o en caso tengamos un grupo ya reservado, te podrías unir a éste.'
    },
    {
      question: '¿Se aceptan más personas de las indicadas en la experiencia?',
      answer: 'Sí, aceptamos en la mayoría de las experiencias. Para conocer nuestras tarifas grupales que no aparecen en la web, mándanos un correo!'
    },
    {
      question: '¿Qué medios de pago aceptan?',
      answer: 'Aceptamos tarjeta de débito y crédito VISA y Mastercard.'
    },
    {
      question: '¿La operación de pago es segura?',
      answer: '¡Sí es segura! Utilizamos Pago Web de Niubiz para procesar su pago, asegurándonos que sus datos confidenciales estén protegidos y seguros a través de un sistema que cuenta con  Certificación PCI DSS.'
    },
    {
      question: '¡Ayuda! No puedo pagar',
      answer: 'Si no puedes pagar, debe ser que el emisor de tu tarjeta rechazó el pago. La solución es utilizar otra tarjeta para realizar la reserva, y llamar a tu banco para saber por qué rechazó la otra. Si tienes otro problema con el pago, contáctanos por correo y te ayudaremos a solucionarlo.'
    },
    {
      question: '¿Puedo cancelar una experiencia?',
      answer: 'Revisa las Políticas de Cancelación que se encuentran en "Términos y Condiciones"'
    },
    {
      question: '¿Cuánto se demora procesar un reembolso?',
      answer: 'Cuando se procesa un reembolso: Su reembolso demorará hasta 15 días hábiles para que el reembolso se refleje en su cuenta.'
    },
  ],
  'en_EN': [
    {
      question: 'How is MAP IT different from the rest?',
      answer: 'We are a company that promotes sustainable development in Peru through tourism. Our experiences are unique and different from conventional tours: they allow travelers to discover the city in an authentic way from a local perspective. Through them, we generate job opportunities for locals in rural communities and encourage them to preserve their traditions.'
    },
    {
      question: 'Are these experiences safe?',
      answer: 'Yes they are. All experiences have been tested with safety standards, and they are supervised periodically. '
    },
    {
      question: 'How do I book an experience?',
      answer: 'Check the "How it Works" tab for more information on how to book an experience with MAP IT.'
    },
    {
      question: 'Can I customize an experience? ',
      answer: 'Sure! If you want a customized option, send us an e-mail and we\'ll get back to you with a plan that suits you! '
    },
    {
      question: 'I\'m traveling alone, can I join your tours?',
      answer: 'Yes, if it requires a minimum group, send us an email: you could book it with a surcharge, or if we have a group already booked, you could join it.'
    },
    {
      question: 'Do you accept groups of more people?',
      answer: 'Yes, we accept it in most experiences. To know our group rates that do not appear on the web, send us an email!'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept VISA and Mastercard debit and credit card.'
    },
    {
      question: 'Is my payment transaction secure?',
      answer: 'Yes it is! We use Niubiz Web Payment to process your payment, making sure that your private data is protected and secure through a system that has PCI DSS certification.'
    },
    {
      question: 'I can\'t pay, help!',
      answer: 'If you can\'t pay, it must be that your card issuer declined the payment. The solution is to use a different card to make the booking and to call the bank to find out why the other one was rejected. If you have another payment problem,  you can contact us by mail for support.'
    },
    {
      question: 'Can I cancel an experience?',
      answer: 'Check the Cancellation Policies listed in "Terms and Conditions"'
    },
    {
      question: 'How long does a refund takes to process?',
      answer: 'When a refund is issued: Your refund will take up to 15 working days for the refund to be reflected in your account.'
    }
  ]
}


export const state = () => ({
  langs,
  faqs,
  countries,
  currentLangCode: 'ENG',
  authDialogVisible: false,
  subscribeModalVisible: true
})

export const getters = {
  currentLang: (state) => {
    return state.langs.find(lang => lang.code === state.currentLangCode)
  },
  authDialogVisible: (state) => {
    return state.authDialogVisible
  },
  subscribeModalVisible: (state) => {
    return state.subscribeModalVisible
  }
}

export const mutations = {
  SET_SUBSCRIBE_MODAL_VISIBLE(state, value) {
    state.subscribeModalVisible = value
  },
  SET_AUTH_DIALOG_VISIBLE(state, value) {
    state.authDialogVisible = value
  },
  SET_LANG(state, langCode) {
    state.currentLangCode = langCode
  },
  SET_LANG_BY_SLUG(state, langSlug) {
    const code = state.langs.find(item => item.slug === langSlug)
    if(code) {
      state.currentLangCode = code.code
    }
  }
}
