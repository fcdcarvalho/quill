import Parchment from 'parchment';

let SizeStylePt = new Parchment.Attributor.Style('size-pt', 'font-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['10pt', '12pt', '14pt', '18pt', '24pt']
});

export { SizeStylePt };
