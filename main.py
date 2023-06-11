import openai
def ask_gpt(question):
    # Set up OpenAI API credentials
    openai.api_key = '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'

    # Send query to ChatGPT
    response = openai.Completion.create(
        engine='davinci-codex',
        prompt=question,
        max_tokens=50,
        temperature=0.7,
        n=1,
        stop=None,
        timeout=10
    )

    # Extract and return the reply from the response
    reply = response.choices[0].text.strip()
    return reply

# Get user input and ask ChatGPT for a reply
user_input = input("whats the best programming language for people new to code")
reply = ask_gpt(user_input)
print("ChatGPT: " + reply)
print ('done')