var LineField = function (width, height) {
    this.width = width;
    this.height = height;
    this.spotsToClickList = [];
};

LineField.prototype.getWidth = function () {
  return this.width;
};

LineField.prototype.getHeight = function ()  {
  return this.height;
};

LineField.prototype.getClipboard = function ()  {
  return document.getElementById('myCanvas');
};

LineField.prototype.getSpotsToClickList = function ()  {
  return this.spotsToClickList;
};

LineField.prototype.drawGraph = function (){
   console.log('not implemented yet');
}