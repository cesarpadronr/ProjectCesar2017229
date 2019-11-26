<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">

    <html>
        <head>
                <title>Paddy's Cafe Menu</title>
                <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
                <link href="CesarsStyles.css" rel="stylesheet" type="text/css" />
                <!-- Include the JavaScript code for processing the XML data -->
                <script src="CesarsCode.js"></script>
                <script>
			        const splitting = () => {
  let total = parseInt(document.querySelector('#total').value);
  let people = parseInt(document.querySelector('#people').value);
  let tipPercent = document.querySelector('#tipPercent')
  
  if (tipPercent.value !== "") {  
    let calcPercent = parseInt(tipPercent.value)
    const totalWithTip = total + (calcPercent * total) / 100;
    document.querySelector('#perPerson').innerHTML = (totalWithTip / people).toFixed(2);
  } 
  else {
    const result = total / people;
    document.querySelector('#perPerson').innerHTML = result.toFixed(2);
  }
 }
document.querySelector('#addTip').addEventListener('click', (e) => {
  e.preventDefault();
  showTipInput();
})
const showTipInput = () => {
  const tipBtns = document.querySelector('#tipInput')
  if (tipBtns.style.display === "block") {
    tipBtns.style.display = "none"
  } else {
    tipBtns.style.display = "block"
  }
}
const splitBtn = document.querySelector('#splitBtn')
  splitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    splitting();
})
document.querySelector('#resetBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('form').reset();
  document.querySelector('#perPerson').innerHTML = "0"
})
			    </script>
            </head>
        <body>
                <table id="menuTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="3">Paddy's Cafe Menu</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/cafemenu/section">
                            <tr>
                                <td colspan="3">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="entree">
                                <tr>
                                    <xsl:attribute name="vegetarian">
                                        <xsl:value-of select="boolean(./@vegetarian)" />
                                    </xsl:attribute>
                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="item" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
                
<div class="wrapper">
  <div class="header">Bill Splitter</div>
<form class="insert">
  <label id="totalL"><i class="fas fa-coins"></i>How much?</label>
  <input type="number" id="total" placeholder="add the total"></input>>
  <label id="totalL"><i class="fas fa-users"></i>How many?</label>
  <input type="number" id="people" placeholder="add the number of people"></input>>
  <label id="tipL"><i class="fas fa-heart"></i>Feelin' generous?
    <button id="addTip">Add a tip</button>
  </label>
  <div id="tipButtons">
    <input type="number" id="tipPercent" placeholder="add % of the total"></input>>
    <input type="number" id="tipCustom" placeholder="add your custom tip"></input>>
   </div>
    
   <div class="buttonSpace">
     <button id="splitBtn">Split!</button>
     <button id="resetBtn">Reset</button>
    </div>
    <div id="perPerson">0</div>
  </form>
</div>
</body>>
</html>>
    </xsl:template>
</xsl:stylesheet>