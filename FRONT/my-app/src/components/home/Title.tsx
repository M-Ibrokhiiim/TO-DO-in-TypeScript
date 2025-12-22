import {Box,Text} from '@chakra-ui/react'

export default function TITLE(){
 return(
    <>
    <Box  display={'flex'} justifyContent={'center'}>
        <Text fontSize={'40px'} color={'blue.600'} fontWeight={'800'} fontFamily={'emoji'} textTransform={'capitalize'}>
          notes app
        </Text>
    </Box>
    </>
 )
}