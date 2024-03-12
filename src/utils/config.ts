const baseUrl = 'http://ec2-13-210-227-179.ap-southeast-2.compute.amazonaws.com:3000'

export const api = {
  'gate top coins vs BTC': `${baseUrl}/gate_top_tokens_vs_btc`,
  'mexc top coins vs BTC': `${baseUrl}/mexc_top_tokens_vs_btc`,
  'top coins vs BTC': `${baseUrl}/top_tokens_vs_btc`,
  'bottom coins vs BTC': `${baseUrl}/bottom_tokens_vs_btc`,
  'ATH USD': `${baseUrl}/all_time_high_usd`,
  'ATH BTC': `${baseUrl}/all_time_high_btc`,
  'RECENT HIGH BTC': `${baseUrl}/recent_high_btc`,
  'RECENT HIGH USD': `${baseUrl}/recent_high_usd`
}