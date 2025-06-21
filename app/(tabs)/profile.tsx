import React, { useState, useEffect } from 'react';
import { NativeSyntheticEvent, ScrollView, TextInputChangeEventData, TouchableOpacity, TextInput } from 'react-native';
import useAuth from '@/context/auth/use-auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledBlurView, StyledDivider, StyledView, StyleText,} from '../../components/shared/SharedStyles'
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from '@/hooks/use-form';
import GoBackArrow from '@/components/shared/BackArrow/GoBackArrow';
import { Avatar, Button, Icon, IconButton, Surface, TextInput as PaperInput } from 'react-native-paper';
import { useBarber } from '@/hooks/barber-hooks';

const ProfilePage = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const { editUserBio } = useBarber();
    const [editBio, setEditBio] = useState<boolean>(false);
    const [bioText, setBioText] = useState<string>("");
    const [formState, inputHandler, setFormData] = useForm({
        bio: { value: "", isValid: false }
    }, false);

    useEffect(() => {
        if(formState.isValid && formState.inputs.bio.value) {
            setFormData({
                bio: { value: formState.inputs.bio.value, isValid: true }
            }, true)
        }
    }, [formState.isValid, formState.inputs.bio.value])

    const handleEditBio = () => {
        setEditBio(prev => !prev);
        
    };

    const handleBioChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
       inputHandler(
        "bio", 
        e.nativeEvent.text, 
        e.nativeEvent.text.trim().length !== 0 && e.nativeEvent.text.trim().length < 300);
    }

    const mutateUserBio = useMutation({
        mutationKey: ['edit-user-bio'],
        mutationFn: async (text: string) => {
            return await editUserBio(text);
        }
    });

    const handleUpdateUserBio = async () => {
        const { bio } = formState.inputs;
        if(bio.isValid && String(bio?.value)?.trim()?.length > 0) {
            mutateUserBio.mutate(String(bio.value), {
                onSuccess: () => {
                    auth?.updateUser({ bio: String(bio.value) });
                    setEditBio(false);
                },
                onError: (err) => console.log(err),
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <GoBackArrow />
            <ScrollView>
                {/* Container */}
                <StyledView style={{ marginVertical: 10 }}>
                    
                    {/* Header text */}
                <StyleText style={{ fontSize: 20, fontWeight: 700 }}>My Profile</StyleText>

                <StyledDivider orientation="horizontal" marginVertical={10} />

                {/* Profile Picture & Button */}
                <StyledView align="center" gap={5}>
                    <Avatar.Image source={{ uri: barber?.image }}  />
                    <TouchableOpacity activeOpacity={0.8}>
                        <Button icon="pencil">Edit Picture</Button>
                    </TouchableOpacity>
                </StyledView>

                <StyledDivider orientation="horizontal" marginVertical={10} />

                {/* Barber Gallery */}
                <StyleText style={{ fontSize: 15, fontWeight: 600 }}>My Gallery</StyleText>
                    <ScrollView 
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}  
                    >
                <StyledView style={{ marginVertical: 5,  height: 100, width: '100$'}}>
                    <StyledBlurView direction='row' align='center' gap={10} style={{ padding: 5 }}>
                        {Array.from({ length: 6}).map((_, i) => (
                            <StyledView key={i} style={{ height: 80  }}>
                                <Surface style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 10 }} elevation={4}>
                                <IconButton icon="plus-circle-outline" size={20} onPress={() => console.log(`image ${i}`)} />
                                </Surface>
                            </StyledView>
                        ))}
                    </StyledBlurView>
                </StyledView>
                    </ScrollView>
                
                <StyledDivider orientation="horizontal" marginVertical={10} />

                {/* Barber Bio */}
                <StyledView direction="row" align="center" justify="flex-start" gap={10} style={{ marginBottom: 10 }}>
                <StyleText style={{ fontSize: 15, fontWeight: 600 }}>My Bio</StyleText>

                {/* Edit Pencil Button */}
                <StyledBlurView isButton={editBio} clickable onClick={handleEditBio} direction="row" align="center" gap={10} style={{ padding: 5}}>
                    <StyleText>{editBio ? "Edit" : "Close"}</StyleText>
                    <Icon source={editBio ? "pencil" : "close"} size={15} />
                </StyledBlurView>

                </StyledView>

                <StyledView>
  <StyledBlurView style={{ padding: 10, height: 150, position: 'relative' }}>
    {editBio ? (
      <StyleText style={{ fontSize: 15, opacity: 0.6 }}>{barber?.bio?.length === 0 ? "ADD Your Bio!": barber?.bio}</StyleText>
    ) : (
      <StyledView style={{ flex: 1 }}>
        <TextInput
          placeholder='What you want potential clients to know about you?'
          style={{
            color: 'white',
            flex: 1,
            textAlignVertical: 'top',
            paddingRight: 40, 
          }}
          multiline
          maxLength={300}
          value={formState?.inputs?.bio?.value as string}
          onChange={handleBioChange}
        />
        {/* Character counter at bottom-right */}
        <StyleText
          style={{
            position: 'absolute',
            bottom: 5,
            right: 10,
            fontSize: 12,
            color: '#ccc',
          }}
        >
          {String(formState?.inputs?.bio?.value).length}/300
        </StyleText>
      </StyledView>
    )}
  </StyledBlurView>

  {!editBio && <Button onPress={handleUpdateUserBio} disabled={!formState.isValid}>Save</Button>}
</StyledView>


                </StyledView>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfilePage;