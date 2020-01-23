//TBX extensible constraint specification (XCS)
//picklist values: ISO 12620

const sqlite=require('better-sqlite3');
const db=new sqlite('../data/termbases/bnt.sqlite', {fileMustExist: true});

const fs=require("fs");
const xmlformatter=require("xml-formatter");
const XCSFILE="_entries.xcs.xml";
const TBXFILE="_entries.tbx.xml";

//Read the termbase configs:
var lingo=null;
var ident=null;
var sqlSelectConfigs=db.prepare("select * from configs where id in ('lingo', 'ident')");
sqlSelectConfigs.all().map(row => {
  if(row.id=="lingo") lingo=JSON.parse(row.json);
  if(row.id=="ident") ident=JSON.parse(row.json);
});
var termbaseLang=""; lingo.languages.map(l => {if(!termbaseLang) termbaseLang=l.abbr});

//------
//Export the termbase's configuration and metadata into an XCS file:
//------

fs.writeFileSync(XCSFILE, `<?xml version="1.0" encoding="UTF-8"?>
<TBXXCS name="master" version="0.4" lang="${termbaseLang}">
  <header>
    <title>${clean4xml(ident.title[termbaseLang])}</title>
  </header>
  <languages>
`, "utf8");
lingo.languages.map(lang => {
  fs.appendFileSync(XCSFILE, "    "+doLang(lang)+"\n", "utf8");
});
fs.appendFileSync(XCSFILE, `  </languages>
</TBXXCS>
`, "utf8");

function doLang(lang){
  var name=""; lingo.languages.map(l => {
    if(!name && lang.title[l.abbr]) name=lang.title[l.abbr];
  });
  var ret=`<langInfo><langCode>${lang.abbr}</langCode><langName>${clean4xml(name)}</langName></langInfo>`;
  return ret;
}


//------
//Export the termbase's entries into a TBX file:
//------

fs.writeFileSync(TBXFILE, `<?xml version="1.0" encoding="UTF-8"?>
<martif type="TBX" xml:lang="${termbaseLang}">
  <martifHeader>
    <fileDesc>
      <titleStmt>
        <title>${clean4xml(ident.title[termbaseLang])}</title>
      </titleStmt>
      <sourceDesc>
        <p>${clean4xml(ident.blurb[termbaseLang])}</p>
      </sourceDesc>
    </fileDesc>
  </martifHeader>
  <text>
    <body>
`, "utf8");
var sqlSelectEntries=db.prepare("select * from entries limit 100");
sqlSelectEntries.all().map(row => {
  var entry=JSON.parse(row.json);
  entry.id=row.id;
  var xml=doEntry(entry);
  xml=xmlformatter(xml, {collapseContent: true});
  fs.appendFileSync(TBXFILE, "\n"+xml+"\n", "utf8");
});
fs.appendFileSync(TBXFILE, `
    </body>
  </text>
</martif>
`, "utf8");

function doEntry(entry){
  var ret=`<termEntry id="eid-${entry.id}">`;
  lingo.languages.map(lang => {
    ret+=doLangset(entry, lang.abbr);
  });
  ret+=`</termEntry>`;
  return ret;
}

function doLangset(entry, langCode){
  var empty=true;
  var ret=`<langSet xml:lang="${langCode}">`;
  entry.desigs.map(desig => {
    if(desig.term.lang==langCode){
      ret+=doDesig(desig);
      empty=false;
    }
  });
  ret+=`</langSet>`;
  if(!empty) return ret;
  return "";
}

function doDesig(desig){
  var ret=`<ntig>`;
    ret+=`<termGrp>`;
      ret+=`<term id="tid-${desig.term.id}">${clean4xml(desig.term.wording)}</term>`;
    ret+=`</termGrp>`;
  ret+=`</ntig>`;
  return ret;
}

//Utilities:
function clean4xml(s){
  s=s.replace(/\&/g, "&amp;");
  s=s.replace(/\"/g, "&quot;");
  s=s.replace(/\'/g, "&apos;");
  s=s.replace(/\</g, "&lt;");
  s=s.replace(/\>/g, "&gt;");
  return s;
}