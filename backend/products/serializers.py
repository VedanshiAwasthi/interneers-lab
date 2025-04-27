from rest_framework import serializers
from .models.ProductModel import Product
from .models.CategoryModel import ProductCategory
from bson import ObjectId
from bson.errors import InvalidId

class ProductCategorySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(allow_blank=True, required=False)

    def create(self, validated_data):
        return ProductCategory(**validated_data).save()
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
 

class ProductSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True)
    brand = serializers.CharField(required=False, allow_blank=True)
    category = serializers.ListField(child=serializers.CharField())
    price = serializers.FloatField()
    quantity = serializers.IntegerField()

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Product name cannot be empty.")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative.")
        return value

    def validate_category(self, value):

        print(value,"d")
        if not isinstance(value, list):
            raise serializers.ValidationError("Category must be a list of valid category IDs.")
        
        try:
            category_ids = [ObjectId(cid) for cid in value]
            print("dddd" , category_ids)
        except (InvalidId, TypeError, ValueError) as e:
            raise serializers.ValidationError(f"One or more category IDs are invalid: {str(e)}")


        categories = ProductCategory.objects(id__in=category_ids)
        if len(categories) != len(category_ids):
            raise serializers.ValidationError("Some categories are invalid.")

        return list(categories)
    
    def create(self, validated_data):
        
        categories = validated_data.pop("category", [])
        product = Product(category=categories, **validated_data)
        product.save()
        return product

    def update(self, instance, validated_data):
        
        for key, value in validated_data.items():
            if key == "category":
                print("Categories from validated_data:", value)
                # value is already a list of ProductCategory objects
                instance.category = value
            else:
                setattr(instance, key, value)

        instance.save()
        return instance



    def to_representation(self, instance):

        data = {
            "id": str(instance.id),
            "name": instance.name,
            "description": instance.description,
            "brand": instance.brand,
            "category": [cat.title for cat in instance.category] if instance.category else [],
            "price": float(instance.price),
            "quantity": int(instance.quantity),
        }
        return data
