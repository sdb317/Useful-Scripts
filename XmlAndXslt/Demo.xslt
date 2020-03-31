<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:msxsl='urn:schemas-microsoft-com:xslt' exclude-result-prefixes='msxsl' xmlns:utils='https://demo.com/'>
  <xsl:output method='html' encoding='utf-8' indent='yes'/>
  <xsl:param name='Message' select='Message'/>

  <msxsl:script implements-prefix='utils' language='javascript'>
    <![CDATA[

    ]]>
  </msxsl:script>

  <!-- strip whitespace from whitespace-only nodes -->
  <xsl:strip-space elements='*'/>

  <xsl:template match='@* | node()'/>

  <xsl:template match='/'>
    <xsl:apply-templates select='ItemList'/>
  </xsl:template>

  <xsl:template match='ItemList'>
    <xsl:element name='table'>
      <xsl:element name='tbody'>
        <xsl:apply-templates select='./Item'/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template match='Item'>
    <xsl:element name='tr'>
      <xsl:element name='td'>
        <xsl:attribute name='style'>text-align:left;</xsl:attribute>
        <xsl:value-of select='./text()'/>
      </xsl:element>
      <xsl:element name='td'>
        <xsl:attribute name='style'>text-align:right;</xsl:attribute>
        <xsl:value-of select='$Message'/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
