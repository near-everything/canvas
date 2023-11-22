
// takes in raw data and prepares
function prepareMessages({ systemPrompt, dataUrl, instruction, comment, previousResponseContent }) {
  // dataUrl
  // instruction
  // comment

  const userMessages = [
    {
      type: "image_url",
      image_url: {
        // send an image of the current selection to gpt-4 so it can see what we're working with
        url: dataUrl,
        detail: "high",
      },
    },
    {
      type: "text",
      text: instruction, // comes from agent definition (instruction)
    },
    {
      // send the text of all selected shapes, so that GPT can use it as a reference (if anything is hard to see)
      type: "text",
      text: comment
    },
  ];


  // if the user has selected a previous response from gpt-4, include that too. hopefully gpt-4 will
  // modify it with any other feedback or annotations the user has left.
  if (previousResponseContent) {
    userMessages.push({
      type: "text",
      text: previousResponseContent,
    });
  }

  // combine the user prompt with the system prompt
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessages },
  ];
}

// takes the output of prepare
function execute({}) { 
  // and returns the result... maybe this could be a stream of results
}


return { prepare, execute };