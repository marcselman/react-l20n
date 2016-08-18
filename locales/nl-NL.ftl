# FTL based on ICU MessageFormat
product-name	= MarktfeedNL
hello			= Hallo, Wereld!
long-desc		=
	| This is a long
	| seperated line...
people			= { PLURAL($count) ->
	[one]		Een persoon
	*[other]	{$count} personen
}