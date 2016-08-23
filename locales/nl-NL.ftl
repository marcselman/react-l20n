# FTL based on ICU MessageFormat
product-name	= MarktfeedNL
hello			=
	| Hallo, Wereld!
	| <strong>AAP</strong>
long-desc		=
	| This is a long
	| seperated line...
people			= { PLURAL($count) ->
	[one]		Een persoon
	*[other]	{$count} personen
}
login-input		= Voorbepaalde waarde
	[html/placeholder]		voorbeeld@email.nl
	[html/aria-label]		Login invoer waarde
	[html/title]			Typ je login email