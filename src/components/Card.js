import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack borderRadius="lg" bg="white" alignContent="left">
      <Image src={imageSrc} borderRadius="lg"></Image>
      <VStack p={4} spacing={4} alignItems="flex-start">
        <Heading as="h6" size="md" color="black">{title}</Heading>
        <Text color="gray.500" size="sm"> {description}</Text>
        <HStack color="black">
          <Text fontSize="sm">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  )
  return null;
};

export default Card;
