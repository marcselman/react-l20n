# FTL based on ICU MessageFormat
product-name	= Marktfeed
hello			= Hello, World!
long-desc		=
	| This is a long
	| seperated line...
people			= { PLURAL($count) ->
	[one]		One person
	*[other]	{$count} people
}