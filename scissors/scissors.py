import random

def get_user_choice():
    user_input = input("Enter your choice (stone, scissors, paper): ").lower()
    if user_input not in ['stone', 'scissors', 'paper']:
        print("Invalid choice. Please try again.")
        return get_user_choice()
    return user_input

def get_computer_choice():
    return random.choice(['stone', 'scissors', 'paper'])

def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (user_choice == 'stone' and computer_choice == 'scissors') or \
         (user_choice == 'scissors' and computer_choice == 'paper') or \
         (user_choice == 'paper' and computer_choice == 'stone'):
        return "You win!"
    else:
        return "You lose!"

import random

def get_user_choice():
    # Prompt the user to enter their choice and convert it to lowercase
    user_input = input("Enter your choice (stone, scissors, paper): ").lower()
    # Check if the input is valid
    if user_input not in ['stone', 'scissors', 'paper']:
        print("Invalid choice. Please try again.")
        # Recursively call the function until a valid choice is made
        return get_user_choice()
    return user_input

def get_computer_choice():
    # Randomly select a choice for the computer
    return random.choice(['stone', 'scissors', 'paper'])

def determine_winner(user_choice, computer_choice):
    # Determine the winner based on the rules of the game
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (user_choice == 'stone' and computer_choice == 'scissors') or \
         (user_choice == 'scissors' and computer_choice == 'paper') or \
         (user_choice == 'paper' and computer_choice == 'stone'):
        return "You win!"
    else:
        return "You lose!"

def play_game():
    # Get the user's choice
    user_choice = get_user_choice()
    # Get the computer's choice
    computer_choice = get_computer_choice()
    # Print the choices
    print(f"You chose: {user_choice}")
    print(f"Computer chose: {computer_choice}")
    # Determine and print the result
    result = determine_winner(user_choice, computer_choice)
    print(result)

if __name__ == "__main__":
    # Start the game
    play_game()