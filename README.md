RECIPES
.GET    /api/recipes/       RETURNS: List of all recipes for a given user with recipe, category, and id


.GET   /api/recipes/:id     RETURNS: {"recipe_name":"string", "source_name":"string","img_url":"string","category_id": integer,recipe_id:integer,instructions:[array], ingredients:[array] }

.POST   /api/recipes/       Expects {"recipe_name":"string", "source_name":"string","category_id": integer, "img_url":"string"} RETURNS: Created recipe


.PUT   /api/recipes/:id     Expects optional {"recipe_name":"string", "source_name":"string","category_id": integer, "img_url":"string"} RETURNS: Modified recipe


.DELETE  /api/recipes/id    RETURNS: The deleted recipe

INSTRUCTIONS

.POST /api/instructions/:id    EXPECTS {"step_number":integer, "instruction_text":"string"} NOTE: ":id" is recipe ID    RETURNS: The object on success, gives error if step is already taken

.PUT /api/instructions/:id/:instruction_id        EXPECTS OPTIONAL:{"step_number":integer, "instruction_text":"string"} NOTE:":id" is recipe ID  RETURNS: The object on success, gives error if step is already taken

.DELETE /api/instructions/:id/:instruction_id RETURNS: Message with deleted instruction ID

INGREDIENTS

.POST    /api/ingredients/:id/     EXPECTS {"quantity":integer,"quantity_units":"string", "ingredient_name":"string"}
RETURNS: The new object

.PUT    /api/ingredients/:id/:ingredient_id    EXPECTS OPTIONAL {"quantity":integer,"quantity_units":"string", "ingredient_name":"string"} RETURNS: The modifications

.DELETE /api/ingredients/:id/:ingredient_id     RETURNS: Deleted entry minus ingredient name


