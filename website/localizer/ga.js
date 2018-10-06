function L(s, gloss){
  if(s=="READ-ONLY") return "LÉAMH AMHÁIN";
  if(s=="Edit") return "Eagarthóireacht";
  if(s=="Dublin City University") return "Ollscoil Chathair Bhaile Átha Cliath";
  if(s=="Log out") return "Logáil amach";
  if(s=="Change your password") return "Athraigh do phasfhocal";
  if(s=="Registered user login") return "Úsáideoirí cláraithe";
  if(s=="Get an account") return "Cruthaigh cuntas duit féin";
  if(s=="Forgot your password?") return "Pasfhocal dearmadta?";
  if(s=="E-mail address") return "Seoladh ríomhphoist";
  if(s=="Password") return "Pasfhocal";
  if(s=="Log in") return "Logáil isteach";
  if(s=="Your termbases") return "Do chuid cnuasach";
  if(s=="You have no termbases yet.") return "Níl cnuasach ar bith agat go fóill.";
  if(s=="Create a termbase") return "Cruthaigh cnuasach";
  if(s=="Administration") return "Riarachán";
  if(s=="Users") return "Úsáideoirí";
  if(s=="Termbases") return "Cnuasaigh";
  if(s=="smart search") return "cuardach cliste";
  if(s=="starts like this") return "tosaíonn mar seo";
  if(s=="contains a word that starts like this") return "tiomsaíonn focal a thosaíonn mar seo";
  if(s=="contains this sequence of characters") return "tiomsaíonn an teaghrán seo de charachtair";
  if(s=="search in all languages") return "cuardaigh i ngach teangach";
  if(s=="search in:") return "cuardaigh i:";
  if(s=="sort by:") return "sórtáil de réir:";
  if(s=="Configuration") return "Cumrú";
  if(s=="Metadata") return "Meiteashonraí";
  if(s=="ADMIN") return "RIAR";
  if(s=="TRM") return "TRM";
  if(s=="DOM") return "RÉIM";
  if(s=="DEF") return "SAIN";
  if(s=="XMPL") return "SMPL"
  if(s=="REL") return "XTAG";
  if(s=="CHECKING STATUS") return "STÁDAS SEICEÁLA";
  if(s=="PUBLISHING STATUS") return "STÁDAS FOILSITHE";
  if(s=="TERMS") return "TÉARMAÍ";
  if(s=="DOMAINS") return "RÉIMSÍ";
  if(s=="checked") return "seiceáilte";
  if(s=="not checked") return "neamhsheiceáilte";
  if(s=="publishable") return "infhoilsithe";
  if(s=="hidden") return "i bhfolach";
  if(s=="term") return "téarma";
  if(s=="clarification") return "soiléiriú";
  if(s=="acceptability") return "inghlacthacht";
  if(s=="source") return "foinse";
  if(s=="inflected form") return "foirm infhillte";
  if(s=="annotation") return "nod";
  if(s=="domain") return "réimse";
  if(s=="subdomain") return "foréimse";
  if(s=="part of speech") return "roinn chainte";
  if(s=="inflection") return "infhilleadh";
  if(s=="language of origin") return "teanga dhúchais";
  if(s=="symbol") return "siombail";
  if(s=="trademark") return "trádmharc";
  if(s=="registered trademark") return "trádmharc cláraithe";
  if(s=="proper noun") return "ainm dílis";
  if(s=="formatting") return "formáidiú";
  if(s=="italic") return "cló iodálach";
  if(s=="none" && gloss=="no subdomain") return "gan foréimse";
  if(s=="Created") return "Cruthaithe";
  if(s=="Changed") return "Athraithe";
  if(s=="Deleted") return "Scriosta";
  if(s=="Bulk-deleted") return "Baisc-scriosta";
  if(s=="while uploading") return "le linn uaslódála";
  if(s=="By") return "Ag";
  if(s=="When") return "Cathain";
  if(s=="any checking status") return "stádas sseiceála ar bith";
  if(s=="any publishing status") return "stádas foilsithe ar bith";
  if(s=="any language") return "teanga ar bith";
  if(s=="any acceptabilty or no acceptability") return "inghlacthacht ar bith nó gan inghlacthacht";
  if(s=="any acceptabilty") return "inghlacthacht ar bith";
  if(s=="no acceptability") return "gan inghlacthacht";
  if(s=="any domain or no domain") return "réimse ar bith nó gan réimse";
  if(s=="any domain") return "réimse ar bith";
  if(s=="no domain") return "gan réimse";
  if(s=="any subdomain or no subdomain") return "foréimse ar bith nó gan foréimse";
  if(s=="any subdomain") return "foréimse ar bith";
  if(s=="no subdomain") return "gan foréimse";
  if(s=="DATESTAMP") return "DÁTSTAMPA";
  if(s=="LAST MAJOR UPDATE") return "MÓR-ATHRÚ DEIREANACH";
  if(s=="set to today") return "athraigh go inniu";
  if(s=="any datestamp or no datestamp") return "dátstampa ar bith nó gan dátstampa";
  if(s=="any datestamp") return "dátstampa ar bith";
  if(s=="no datestamp") return "gan dátstampa";
  if(s=="datestamp before...") return "dátstampa roimh...";
  if(s=="datestamp on...") return "dátstampa ar...";
  if(s=="datestamp after...") return "dátstampa tar éis...";

  if(!gloss) console.log(`if(s=="${s}") return "";`);
  else console.log(`if(s=="${s}", "${gloss}") return "";`);
  //if(s=="") return s;
  return s;
}

try {
  module.exports={
    L: L,
  }
} catch(e){}