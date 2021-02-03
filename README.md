
.GET    /api/recipes/       RETURNS: List of all recipes for a given user with recipe, category, and id


.GET   /api/recipes/:id     RETURNS: {"recipe_name":"string", "source_name":"string","img_url":"string","category_id": integer,recipe_id:integer,instructions:[array], ingredients:[array] }

.POST   /api/recipes/       Expects {"recipe_name":"string", "source_name":"string","category_id": integer, "img_url":"string"} RETURNS: Created recipe


.PUT   /api/recipes/:id     Expects optional {"recipe_name":"string", "source_name":"string","category_id": integer, "img_url":"string"} RETURNS: Modified recipe


.DELETE  /api/recipes/11    RETURNS: The deleted recipe