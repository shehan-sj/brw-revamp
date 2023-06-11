def plus_one(num):
    return num+1

def function_call(function):
    num_add = 5
    return function(num_add)


print(str(function_call(plus_one)))


def uppercase_decorator(function):
    def wrapper():
        func = function()
        make_uppercase = func.upper()
        return make_uppercase

    return wrapper

def say_hi():
    return 'hello there'

decorate = uppercase_decorator(say_hi)
print(decorate())

@uppercase_decorator
def say_hi():
    return 'hello there'+
print(say_hi())