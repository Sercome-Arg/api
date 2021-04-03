#!/bin/sh

Entities="../src/Domain/Entities"
Controllers="../src/Presentation/Controllers"
scripts=$PWD

echo "Entity (minus): "
read nameMinus

echo "Entity (mayus): "
read nameMayus

cd $Entities
mkdir $nameMayus
cp -a "./Entity/." "./${nameMayus}/"
cd $nameMayus
sed -i "s/entityname/${nameMinus}/g" Model.ts

cd $scripts

cd $Controllers
mkdir $nameMayus
cp -a "./Entity/." "./${nameMayus}/"

cd $nameMayus
sed -i "s/entity/${nameMinus}/g" Controller.ts
sed -i "s/Entity/${nameMayus}/g" Controller.ts
sed -i "s/Entity/${nameMayus}/g" types.ts
sed -i "s/Entity/${nameMayus}/g" inversify.ts

cd $scripts
cd ../src
sed -i "s+import entity from './Presentation/Controllers/Entity/types'+import ${nameMinus} from './Presentation/Controllers/${nameMayus}/types'\nimport entity from './Presentation/Controllers/Entity/types'+g" TYPES.ts
sed -i "s+returnEntities = jsonConcat(returnEntities, entity);+returnEntities = jsonConcat(returnEntities, ${nameMinus});\nreturnEntities = jsonConcat(returnEntities, entity);+g" TYPES.ts

sed -i "s+// containerimport+import ${nameMayus}Container from './Presentation/Controllers/${nameMayus}/inversify'\n// containerimport+g" inversify.config.ts
sed -i "s+// push+containerReturn = Container.merge(containerReturn, ${nameMayus}Container)\n// push+g" inversify.config.ts
