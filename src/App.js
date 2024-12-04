import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'

const CURRENCY_NAME_TO_CODE = {
  'United Arab Emirates Dirham': 'AED',
  'Afghan Afghani': 'AFN',
  'Albanian Lek': 'ALL',
  'Armenian Dram': 'AMD',
  'Netherlands Antillean Guilder': 'ANG',
  'Angolan Kwanza': 'AOA',
  'Argentine Peso': 'ARS',
  'Australian Dollar': 'AUD',
  'Aruban Florin': 'AWG',
  'Azerbaijani Manat': 'AZN',
  'Bosnia-Herzegovina Convertible Mark': 'BAM',
  'Barbadian Dollar': 'BBD',
  'Bangladeshi Taka': 'BDT',
  'Bulgarian Lev': 'BGN',
  'Bahraini Dinar': 'BHD',
  'Burundian Franc': 'BIF',
  'Bermudan Dollar': 'BMD',
  'Brunei Dollar': 'BND',
  'Bolivian Boliviano': 'BOB',
  'Brazilian Real': 'BRL',
  'Bahamian Dollar': 'BSD',
  Bitcoin: 'BTC',
  'Bhutanese Ngultrum': 'BTN',
  'Botswanan Pula': 'BWP',
  'Belarusian Ruble': 'BYN',
  'Belize Dollar': 'BZD',
  'Canadian Dollar': 'CAD',
  'Congolese Franc': 'CDF',
  'Swiss Franc': 'CHF',
  'Chilean Unit of Account (UF)': 'CLF',
  'Chilean Peso': 'CLP',
  'Chinese Yuan (Offshore)': 'CNH',
  'Chinese Yuan': 'CNY',
  'Colombian Peso': 'COP',
  'Costa Rican Colón': 'CRC',
  'Cuban Convertible Peso': 'CUC',
  'Cuban Peso': 'CUP',
  'Cape Verdean Escudo': 'CVE',
  'Czech Republic Koruna': 'CZK',
  'Djiboutian Franc': 'DJF',
  'Danish Krone': 'DKK',
  'Dominican Peso': 'DOP',
  'Algerian Dinar': 'DZD',
  'Egyptian Pound': 'EGP',
  'Eritrean Nakfa': 'ERN',
  'Ethiopian Birr': 'ETB',
  Euro: 'EUR',
  'Fijian Dollar': 'FJD',
  'Falkland Islands Pound': 'FKP',
  'British Pound Sterling': 'GBP',
  'Georgian Lari': 'GEL',
  'Guernsey Pound': 'GGP',
  'Ghanaian Cedi': 'GHS',
  'Gibraltar Pound': 'GIP',
  'Gambian Dalasi': 'GMD',
  'Guinean Franc': 'GNF',
  'Guatemalan Quetzal': 'GTQ',
  'Guyanaese Dollar': 'GYD',
  'Hong Kong Dollar': 'HKD',
  'Honduran Lempira': 'HNL',
  'Croatian Kuna': 'HRK',
  'Haitian Gourde': 'HTG',
  'Hungarian Forint': 'HUF',
  'Indonesian Rupiah': 'IDR',
  'Israeli New Sheqel': 'ILS',
  'Manx pound': 'IMP',
  'Indian Rupee': 'INR',
  'Iraqi Dinar': 'IQD',
  'Iranian Rial': 'IRR',
  'Icelandic Króna': 'ISK',
  'Jersey Pound': 'JEP',
  'Jamaican Dollar': 'JMD',
  'Jordanian Dinar': 'JOD',
  'Japanese Yen': 'JPY',
  'Kenyan Shilling': 'KES',
  'Kyrgystani Som': 'KGS',
  'Cambodian Riel': 'KHR',
  'Comorian Franc': 'KMF',
  'North Korean Won': 'KPW',
  'South Korean Won': 'KRW',
  'Kuwaiti Dinar': 'KWD',
  'Cayman Islands Dollar': 'KYD',
  'Kazakhstani Tenge': 'KZT',
  'Laotian Kip': 'LAK',
  'Lebanese Pound': 'LBP',
  'Sri Lankan Rupee': 'LKR',
  'Liberian Dollar': 'LRD',
  'Lesotho Loti': 'LSL',
  'Libyan Dinar': 'LYD',
  'Moroccan Dirham': 'MAD',
  'Moldovan Leu': 'MDL',
  'Malagasy Ariary': 'MGA',
  'Macedonian Denar': 'MKD',
  'Myanma Kyat': 'MMK',
  'Mongolian Tugrik': 'MNT',
  'Macanese Pataca': 'MOP',
  'Mauritanian Ouguiya': 'MRU',
  'Mauritian Rupee': 'MUR',
  'Maldivian Rufiyaa': 'MVR',
  'Malawian Kwacha': 'MWK',
  'Mexican Peso': 'MXN',
  'Malaysian Ringgit': 'MYR',
  'Mozambican Metical': 'MZN',
  'Namibian Dollar': 'NAD',
  'Nigerian Naira': 'NGN',
  'Nicaraguan Córdoba': 'NIO',
  'Norwegian Krone': 'NOK',
  'Nepalese Rupee': 'NPR',
  'New Zealand Dollar': 'NZD',
  'Omani Rial': 'OMR',
  'Panamanian Balboa': 'PAB',
  'Peruvian Nuevo Sol': 'PEN',
  'Papua New Guinean Kina': 'PGK',
  'Philippine Peso': 'PHP',
  'Pakistani Rupee': 'PKR',
  'Polish Zloty': 'PLN',
  'Paraguayan Guarani': 'PYG',
  'Qatari Rial': 'QAR',
  'Romanian Leu': 'RON',
  'Serbian Dinar': 'RSD',
  'Russian Ruble': 'RUB',
  'Rwandan Franc': 'RWF',
  'Saudi Riyal': 'SAR',
  'Solomon Islands Dollar': 'SBD',
  'Seychellois Rupee': 'SCR',
  'Sudanese Pound': 'SDG',
  'Swedish Krona': 'SEK',
  'Singapore Dollar': 'SGD',
  'Saint Helena Pound': 'SHP',
  'Sierra Leonean Leone': 'SLL',
  'Somali Shilling': 'SOS',
  'Surinamese Dollar': 'SRD',
  'South Sudanese Pound': 'SSP',
  'São Tomé and Príncipe Dobra (pre-2018)': 'STD',
  'São Tomé and Príncipe Dobra': 'STN',
  'Salvadoran Colón': 'SVC',
  'Syrian Pound': 'SYP',
  'Swazi Lilangeni': 'SZL',
  'Thai Baht': 'THB',
  'Tajikistani Somoni': 'TJS',
  'Turkmenistani Manat': 'TMT',
  'Tunisian Dinar': 'TND',
  "Tongan Pa'anga": 'TOP',
  'Turkish Lira': 'TRY',
  'Trinidad and Tobago Dollar': 'TTD',
  'New Taiwan Dollar': 'TWD',
  'Tanzanian Shilling': 'TZS',
  'Ukrainian Hryvnia': 'UAH',
  'Ugandan Shilling': 'UGX',
  'United States Dollar': 'USD',
  'Uruguayan Peso': 'UYU',
  'Uzbekistan Som': 'UZS',
  'Venezuelan Bolívar Soberano': 'VES',
  'Vietnamese Dong': 'VND',
  'Vanuatu Vatu': 'VUV',
  'Samoan Tala': 'WST',
  'CFA Franc BEAC': 'XAF',
  'East Caribbean Dollar': 'XCD',
  'Special Drawing Rights': 'XDR',
  'CFA Franc BCEAO': 'XOF',
  'CFP Franc': 'XPF',
  'Yemeni Rial': 'YER',
  'South African Rand': 'ZAR',
  'Zambian Kwacha': 'ZMW',
  'Zimbabwean Dollar': 'ZWL',
}

const ACCESS_KEY = process.env.REACT_APP_EXCHANGERATE_API_KEY

function App() {
  return <CurrencyConverter />
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('United States Dollar')
  const [toCurrency, setToCurrency] = useState('Turkish Lira')
  const [conversionResult, setConversionResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      convertCurrency()
    }
  }, [fromCurrency, toCurrency])

  const convertCurrency = async () => {
    try {
      setError(null) // error mesajını temizler
      const response = await axios.get(
        `https://api.exchangerate.host/convert?access_key=${ACCESS_KEY}&from=${CURRENCY_NAME_TO_CODE[fromCurrency]}&to=${CURRENCY_NAME_TO_CODE[toCurrency]}&amount=${amount}`
      )
      const rate = response.data.result
      if (rate) {
        setConversionResult(rate.toFixed(2))
      } else {
        setError('Bu para birimi için dönüşüm bulunamadı.')
      }
    } catch (err) {
      setError('API isteği başarısız oldu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 p-5">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-orange-600 mb-4">
          Currency Converter
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Convert Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fromCurrency"
              className="text-sm font-medium text-gray-700"
            >
              From
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.keys(CURRENCY_NAME_TO_CODE).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="toCurrency"
              className="text-sm font-medium text-gray-700"
            >
              To
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.keys(CURRENCY_NAME_TO_CODE).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={convertCurrency}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Convert
          </button>
          {conversionResult && (
            <p className="text-center text-lg font-medium text-green-600 mt-4">
              {amount} {CURRENCY_NAME_TO_CODE[fromCurrency]} ={' '}
              {conversionResult} {CURRENCY_NAME_TO_CODE[toCurrency]}
            </p>
          )}
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
