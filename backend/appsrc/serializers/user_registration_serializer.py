from ..models import YouYodaUser

from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = YouYodaUser
        fields = ('username', 'password', 'email', 'is_trainer')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'], 
            is_trainer=validated_data['is_trainer'])
        user.set_password(validated_data['password'])

        user.save()
        return user