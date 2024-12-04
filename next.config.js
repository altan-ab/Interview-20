/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_EXCHANGERATE_API_KEY: process.env.REACT_APP_EXCHANGERATE_API_KEY,
  },
}

module.exports = nextConfig