# Memorable

## Get Started

~~~bash
# Create an item
mem new
# The ID of the item is returned

# Get the item by ID 
mem item [id]
# The properties of the item is printed; null is printed if the ID does not exist 
~~~

### Base
~~~bash
# Create an item with key and value
mem new [key] [value]

# Retrieve items by key
mem find [key]

# To get the value of an item
mem val [id]
~~~
Key conflicts: different items distinguished by IDs.

### Date

## Tags
~~~bash
# To get a tag (create if not exist)
mem tag [label]

# To bind a tag to an item
mem bind [key | id] [label]

# To gets all tags to an item
mem tags [key | id]
~~~