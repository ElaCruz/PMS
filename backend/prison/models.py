from django.db import models
import datetime
import os

# Function to handle Image
def filepath(request, filename):
    old_filename = filename
    timeNow =datetime.datetime.now().strftime('%Y%m%d%H:%M:%S')
    filename = "%s%s" % (timeNow, old_filename)
    return os.path.join('uploads/', filename)

# Create your models here.

# The Gender Model
class Gender(models.Model):
    name = models.CharField(max_length=30, unique=True)
    def __str__(self):
        return self.name

# The Status Model
class Status(models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name

# The Offense  Model
class Offense(models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name
    

    

# The Cell Model
class Cell(models.Model):
    name = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.name
# class Cell(models.Model):
#     name = models.CharField(max_length=20)
#     def __str__(self):
#         return self.name

  # The Prisoner Model
class Prisoner(models.Model):
        first_name = models.CharField(max_length=50)
        last_name = models.CharField(max_length=50)
        age = models.IntegerField()
        gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
        status = models.ForeignKey(Status, on_delete=models.CASCADE)
        height = models.CharField(max_length=10)
        weight= models.CharField(max_length=10)
        eye_color = models.CharField(max_length=20)
        hair_color = models.CharField(max_length=20)
        crime_committed = models.CharField(max_length=50)
        health_concerns = models.CharField(max_length=100)
        cell = models.ForeignKey(Cell, on_delete=models.CASCADE )
        photo = models.ImageField(upload_to=filepath, null=True)
        date_arrested = models.DateField()

      #  Court Details fields here
        magistrate_first_name = models.CharField(max_length=50, blank=True)
        magistrate_last_name = models.CharField(max_length=50, blank=True)
        court = models.CharField(max_length=50, blank=True)
        category_of_offense = models.ForeignKey(Offense, on_delete=models.CASCADE, blank=True )
        case_start_date = models.DateField(blank=True)
        case_end_date = models.DateField(blank=True)
        sentence = models.CharField(max_length=20, blank=True)

        def __str__(self):
          return f"{self.first_name} {self.last_name} "


  

# The Guard Model
class Guard(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    cell = models.ForeignKey(Cell, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to= filepath, null=True)
    age = models.IntegerField()
    # status = models.ForeignKey(Status, on_delete=models.CASCADE)
    shift_start_time = models.TimeField()
    shift_end_time = models.TimeField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    


  # The Visitor Model
    
class Visitor(models.Model):
    full_name = models.CharField(max_length=100)
    relation = models.CharField(max_length=50)
    # GENDER_CHOICES = [
    #         ('MALE', 'MALE'),
    #         ('FEMALE', 'FEMALE'),
    #     ]
    # gender = models.CharField(max_length=8, choices=GENDER_CHOICES)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=100)
    prisoner_visited = models.ForeignKey(Prisoner, on_delete=models.CASCADE)
    # prisoner_visited = models.ForeignKey(Prisoner, on_delete=models.CASCADE)
    date_visited = models.DateField()
    time_of_arrival = models.TimeField()
    time_of_departure = models.TimeField()
    cell_visited = models.ForeignKey(Cell, on_delete=models.CASCADE)
    # cell_visited = models.ForeignKey(Cell, on_delete=models.CASCADE)

    def __str__(self):
        return self.full_name

