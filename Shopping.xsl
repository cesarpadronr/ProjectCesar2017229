<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="OptionList" class="indent">
                    <thead>
                        <tr>
                            <th colspan="4">My Shopping List</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/ShoppingList/section">
                            <tr>
                                <td colspan="4">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="entree">
                            <tr id="{position()}">
                                
                                <td align="center">
                                    <input name="item0" type="checkbox" />
                                </td>
                                <td>
                                    <xsl:value-of select="item" />
                                </td>
                                <td>
                                    <xsl:value-of select="quantity" />
                            
                                </td>
                                <td align="right">
                                    <xsl:value-of select="price" />
                                </td>
                                 
                            </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>