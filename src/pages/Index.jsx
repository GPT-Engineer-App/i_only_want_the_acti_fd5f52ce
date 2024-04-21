import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text, Button, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure, VStack, FormControl, FormLabel, theme } from "@chakra-ui/react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const canvasSizes = {
  A4: { width: "210mm", height: "297mm" },
  A5: { width: "148mm", height: "210mm" },
  Letter: { width: "8.5in", height: "11in" },
  Legal: { width: "8.5in", height: "14in" },
};

const Index = () => {
  const [canvasText, setCanvasText] = useState("Your text here...");
  const [canvasSize, setCanvasSize] = useState(canvasSizes.A4);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [fontSize, setFontSize] = useState("20");
  const [activeStep, setActiveStep] = useState(1);
  const maxSteps = 4;

  const nextStep = () => setActiveStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  const { isOpen: isLeftOpen, onOpen: onLeftOpen, onClose: onLeftClose } = useDisclosure();
  const { isOpen: isRightOpen, onOpen: onRightOpen, onClose: onRightClose } = useDisclosure();

  const handleTextChange = (e) => setCanvasText(e.target.value);
  const handleCanvasSizeChange = (size) => setCanvasSize(size);

  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <Box bg="white" minH="100vh" maxH="100vh" overflow="hidden">
      {/* Navbar */}
      <Flex as="nav" justifyContent="space-between" alignItems="center" p={4} borderBottomWidth="1px">
        <IconButton variant="ghost" aria-label="Open login drawer" icon={<FaUserCircle />} onClick={onRightOpen} />
        <Text fontSize="xl" fontWeight="bold">
          Worksheet Generator
        </Text>
        <IconButton variant="ghost" aria-label="Open menu drawer" icon={<FaBars />} onClick={onLeftOpen} />
      </Flex>

      {/* Main content */}
      <Flex>
        {/* Canvas area */}
        <Box flex="2" p={4} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
          <Flex alignItems="center" justifyContent="center" style={{ width: canvasSize.width, height: Math.min(canvasSize.height, "500px") }} border="2px" borderColor="gray.200" borderRadius="md">
            <Text fontSize={`${fontSize}px`}>{canvasText}</Text>
          </Flex>
        </Box>

        {/* Sidebar */}
<Box flex="1" bg="gray.100" p={4}>
  <VStack spacing={4} h="80%">
    {activeStep === 1 && (
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="fontSize">Font Size</FormLabel>
          <Input id="fontSize" type="number" value={fontSize} onChange={handleFontSizeChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="canvasText">Text</FormLabel>
          <Input id="canvasText" value={canvasText} onChange={handleTextChange} />
        </FormControl>
        <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
          Apply Changes
        </Button>
      </VStack>
    )}
    {activeStep === 2 && (
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="backgroundImage">Background Image Link</FormLabel>
          <Input id="backgroundImage" placeholder="Enter image URL" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} />
        </FormControl>
        <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
          Apply Background
        </Button>
      </VStack>
    )}
    {activeStep === 3 && (
      <VStack spacing={4}>
        <Button colorScheme="blackAlpha" onClick={() => handleCanvasSizeChange(canvasSizes.A4)}>
          A4
        </Button>
        <Button colorScheme="blackAlpha" onClick={() => handleCanvasSizeChange(canvasSizes.A5)}>
          A5
        </Button>
        <Button colorScheme="blackAlpha" onClick={() => handleCanvasSizeChange(canvasSizes.Letter)}>
          Letter
        </Button>
        <Button colorScheme="blackAlpha" onClick={() => handleCanvasSizeChange(canvasSizes.Legal)}>
          Legal
        </Button>
      </VStack>
    )}
    {activeStep === 4 && <Box>Step 4 Placeholder</Box>}
  </VStack>
  <Flex h="20%" alignItems="center" justifyContent="space-between" p={4} borderTopWidth="1px">
    <Button onClick={prevStep}>Previous</Button>
    <Button onClick={nextStep}>Next</Button>
  </Flex>
</Box>
      </Flex>

      {/* Left Drawer Menu */}
      <Drawer placement="left" onClose={onLeftClose} isOpen={isLeftOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>{/* Menu content goes here */}</DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Right Drawer Login */}
      <Drawer placement="right" onClose={onRightClose} isOpen={isRightOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" placeholder="Enter your username" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" placeholder="Enter your password" type="password" />
            </FormControl>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onRightClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Login</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
