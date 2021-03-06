from rest_framework import serializers

from ..models import YouYodaUser


class ProfileEditSerializer(serializers.ModelSerializer):
    """Takes or updates data from the User model for fill/edit user profile.

    Converts it to JSON format for transmission via the API.

    """

    class Meta:
        model = YouYodaUser

        fields = (
            'first_name', 'last_name', 'location', 'username', 'about_me',
            'birth_date', 'phone_number', 'i_like', 'email', 'avatar_url'
        )

    def create(self, validated_data):
        """Create user profile"""

        user = YouYodaUser.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            location=validated_data.get('location').encode(),
            username=validated_data.get('username'),
            about_me=validated_data.get('about_me'),
            i_like=validated_data.get('i_like'),
            birth_date=validated_data.get('birth_date'),
            phone_number=validated_data.get('phone_number'),
            avatar_url=validated_data.get('avatar_url')
        )

        user.save()
        return user

    def update(self, instance, validated_data):
        """Update user profile"""

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.location = validated_data.get('location', instance.location)
        instance.username = validated_data.get('username', instance.username)
        instance.about_me = validated_data.get('about_me', instance.about_me)
        instance.i_like = validated_data.get('i_like', instance.i_like)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.avatar_url = validated_data.get('avatar_url', instance.avatar_url)

        instance.save()
        return instance
