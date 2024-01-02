function showSidebar() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('CoverLetterSidebar')
    .setTitle('Cover Letter Helper');

  DocumentApp.getUi().showSidebar(htmlOutput);
}

function onOpen() {
  var ui = DocumentApp.getUi();
  var customMenu = ui.createMenu('Cover Letter Helper');
  customMenu.addItem('Reset Template', 'resetTemplate');
  customMenu.addToUi();
  showSidebar();
}

function resetTemplate() {
  var templateDocId = '1uF5H26NHDhtB_yKqHYuJHrVCQZx3LlDJBf6D9F2_tQk';
  var templateDoc = DocumentApp.openById(templateDocId);
  var currentDoc = DocumentApp.getActiveDocument();
  currentDoc.getBody().clear();
  
  var templateBody = templateDoc.getBody();
  var bodyElements = templateBody.getNumChildren();

  for (var i = 0; i < bodyElements; i++) {
    var element = templateBody.getChild(i).copy();
    
    if (element.getType() == DocumentApp.ElementType.PARAGRAPH) {
      currentDoc.getBody().appendParagraph(element.asParagraph());
    } 
    // else if (element.getType() == DocumentApp.ElementType.TABLE) {
    //   currentDoc.getBody().appendTable(element.asTable());
    // } 
    
  }
}


function updateDocumentVars(companyName, jobTitle, contactName, jobSource) {
  var today = new Date();
  var formattedDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  DocumentApp.getActiveDocument().getBody().replaceText('@todays_date', formattedDate);
  DocumentApp.getActiveDocument().getBody().replaceText('@company_name', companyName);
  DocumentApp.getActiveDocument().getBody().replaceText('@job_title', jobTitle);
  DocumentApp.getActiveDocument().getBody().replaceText('@contact_name', contactName);
  DocumentApp.getActiveDocument().getBody().replaceText('@job_source', jobSource);
}

function getVariableValues(variableNames) {
  var values = [];
  
  for (var i = 0; i < variableNames.length; i++) {
    values.push(PropertiesService.getScriptProperties().getProperty(variableNames[i]));
  }
  return values;
}





