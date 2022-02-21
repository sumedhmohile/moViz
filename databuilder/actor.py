class Actor:
    def __init__(self, id, name, popularity, birthday, department, gender, place_of_birth):
        self.id = id
        self.name = name
        self.popularity = popularity
        self.birthday = birthday
        self.department = department
        self.gender = gender
        self.place_of_birth = place_of_birth

    def __str__(self):
        return str(self.id) + " | " + self.name + " | " + str(self.popularity) + " | " + str(self.birthday) + \
               " | " + str(self.department) + " | " + str(self.gender) + " | " + str(self.place_of_birth)
