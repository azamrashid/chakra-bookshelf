import { Avatar, Button, Flex, Heading, Skeleton, SkeletonText, Text, useColorModeValue } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/client';
import Router from 'next/router';

// TODO: Update design and data available. Change button when logged in to go to user profile not bio
const UserCard = ({ session, isLoading }: { session: Session | null; isLoading: boolean }) => {
  const avatarSrc = session?.user?.image ?? '';

  return (
    <Flex
      rounded={6}
      borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      backgroundColor={useColorModeValue('white', 'gray.800')}
      p={12}
      direction="column"
      alignItems="center"
    >
      {session ? (
        <>
          <Avatar size="2xl" mb={6} rounded="full" src={avatarSrc} />

          <Heading mb={6}>{session.user?.name}</Heading>

          <Flex direction="column" mb={6}>
            <Text>Stuff from your bio here</Text>
            <Text>Stuff about your books and activity here</Text>
          </Flex>

          <Button
            bg="base.900"
            color="base.inverted"
            _hover={{ bg: 'base.800' }}
            // @ts-expect-error Sigh.
            onClick={() => Router.push(`/users/${session?.user?.id}`)}
          >
            Visit Profile
          </Button>
        </>
      ) : (
        <>
          <SkeletonText isLoaded={!isLoading} mb={6}>
            <Heading mb={6}>Welcome to Bookshelf</Heading>
          </SkeletonText>
          <Skeleton isLoaded={!isLoading}>
            <Button bg="base.900" color="base.inverted" _hover={{ bg: 'base.800' }} onClick={() => signIn()}>
              Log in
            </Button>
          </Skeleton>
        </>
      )}
    </Flex>
  );
};

export default UserCard;
