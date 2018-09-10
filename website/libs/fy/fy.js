var Fy={};

Fy.render=function($insideme, data, spec, uneditable){
  var template=spec.templates[":top"]
  var $html=Fy.renderNode(data, template, spec, uneditable);
  $insideme.addClass("fy").html($html);
  $insideme.find(".fy_node").each(function(){
    var $this=$(this);
    if($this.data("template").refresh) $this.data("template").refresh($this);
  });
  $insideme.find(".fy_tab").on("click", function(e){
    Fy.tab($(e.delegateTarget).attr("data-name"));
  });
  Fy.tab();
};
Fy.harvest=function($insideme){
  var $html=$insideme.find("*").first();
  return Fy.harvestNode($html);
};

Fy.renderNode=function(data, template, spec, uneditable){
  var $html=$(template.html).addClass("fy_node").data("template", template);
  if(template.set) template.set($html, data);
  $html.find(".fy_adder").on("click", function(e){
    var $adder=$(e.delegateTarget);
    var subtemplateName=$adder.attr("templateName");
    var subtemplate=spec.templates[subtemplateName];
    var $node=Fy.renderNode(subtemplate.blank, subtemplate, spec, uneditable).data("jsonName", ":item").addClass("jsonName_item").hide();
    $adder.before($node);
    if(subtemplate.refresh) subtemplate.refresh($node);
    $node.fadeIn();
    Fy.changed();
  });
  $html.find(".fy_remover").html("×").on("click", function(e){
    var $adder=$(e.delegateTarget);
    var jsonName=$adder.attr("jsonName");
    var found=false;
    $adder.parents(".fy_node").each(function(){
      var $node=$(this);
      if(!found && $node.data("jsonName")==":item") {
        $node.fadeOut(function(){ $(this).remove(); Fy.changed(); })
        found=true;
      }
    });
  });
  $html.find(".fy_downer").html("▾").on("click", function(e){
    var $adder=$(e.delegateTarget);
    var jsonName=$adder.attr("jsonName");
    var found=false;
    $adder.parents(".fy_node").each(function(){
      var $node=$(this);
      if(!found && $node.data("jsonName")==":item") {
        if($node.next(".fy_node").length>0) Fy.changed();
        $node.next(".fy_node").after($node.hide().fadeIn());
        found=true;
      }
    });
  });
  $html.find(".fy_upper").html("▴").on("click", function(e){
    var $adder=$(e.delegateTarget);
    var jsonName=$adder.attr("jsonName");
    var found=false;
    $adder.parents(".fy_node").each(function(){
      var $node=$(this);
      if(!found && $node.data("jsonName")==":item") {
        if($node.prev(".fy_node").length>0) Fy.changed();
        $node.prev(".fy_node").before($node.hide().fadeIn());
        found=true;
      }
    });
  });
  $html.find(".fy_replace").each(function(){
    var $div=$(this);
    var subtemplateName=$div.attr("templateName");
    var subtemplate=spec.templates[subtemplateName];
    var jsonName=$div.attr("jsonName");
    if(jsonName==":item" && $.isArray(data)){
      data.map(subdata => {
        var $node=Fy.renderNode(subdata, subtemplate, spec, uneditable).data("jsonName", jsonName).addClass("jsonName_item");
        if($div.hasClass("fy_hidable")) $node.addClass("fy_hidable");
        $div.before($node);
      });
      $div.remove();
    } else {
      var subdata=data[jsonName] || [];
      var $node=Fy.renderNode(subdata, subtemplate, spec, uneditable).data("jsonName", jsonName).addClass("jsonName_"+jsonName);
      if($div.hasClass("fy_hidable")) $node.addClass("fy_hidable");
      $div.replaceWith($node);
    }
  });
  if($html.hasClass("fy_collapsible")){
    var $collapsor=$("<div class='collapsor'>+</div>");
    $html.append($collapsor);
    $collapsor.on("click", function(e){
      if($collapsor.html()=="+") {
        $html.find(".fy_hidable").slideDown();
        $collapsor.html("–");
      } else {
        $html.find(".fy_hidable").each(function(){
          var $this=$(this);
          if(!$this.data("template") || $this.data("template").hidable==undefined || $this.data("template").hidable($this)) $this.slideUp();
        });
        $collapsor.html("+");
      }
    });
    $html.find(".fy_hidable").each(function(){
      var $this=$(this);
      if(!$this.data("template") || $this.data("template").hidable==undefined || $this.data("template").hidable($this)) $this.hide();
    });
  }
  return $html;
};
Fy.harvestNode=function($html){
  var template=$html.data("template");
  if(template.get) {
    return template.get($html);
  } else {
    var $subnodes=$html.find(".fy_node").not($html.find(".fy_node .fy_node"));
    if(template.type=="array"){
      var ret=[];
      $subnodes.each(function(){ ret.push(Fy.harvestNode($(this))) });
      return ret;
    } else {
      var ret={};
      $subnodes.each(function(){ ret[$(this).data("jsonName")]=Fy.harvestNode($(this)) });
      return ret;
    }
  }
};

Fy.changed=function(){
  Screenful.Editor.changed();
}
Fy.tab=function(tabName){
  if(!tabName) tabName=Cookies.get("entryEditorTab");
  console.log(tabName);
  if(!tabName || $(".fy_tab[data-name='"+tabName+"']").length==0) tabName=$(".fy_tab.on").attr("data-name");
  if(!tabName) tabName=$(".fy_tab").attr("data-name");
  if(tabName) {
    $(".fy_tab").removeClass("on");
    $(".fy_tab[data-name='"+tabName+"']").addClass("on");
    $(".fy_body").hide();
    $(".fy_body[data-name='"+tabName+"']").fadeIn();
    Cookies.set("entryEditorTab", tabName);
  }
};
