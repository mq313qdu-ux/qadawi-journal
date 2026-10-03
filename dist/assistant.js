// Optional providers must implement interview/edit and stay disabled until explicit consent.
// No content is sent by the default provider; no API keys belong in the browser.
export class LocalWritingProvider{
  id='local-organizer'; remote=false;
  async edit({responses,strength}){const supplied=responses.filter(r=>r.answer?.trim());return supplied.map(r=>strength==='original'?r.answer:`${r.label}\n${r.answer}`).join('\n\n')}
}
export class WritingProviderRegistry{
  constructor(){this.providers=new Map([['local-organizer',new LocalWritingProvider()]])}
  register(provider){if(!provider.id||typeof provider.edit!=='function')throw new Error('Invalid provider');this.providers.set(provider.id,provider)}
  async edit(id,input,consent){const provider=this.providers.get(id);if(!provider)throw new Error('Provider unavailable');if(provider.remote&&consent?.explicit!==true)throw new Error('Explicit selection and consent required');return provider.edit(input)}
}
