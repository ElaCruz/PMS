from django.contrib import admin
from django.db import connection
from .models import Cell,Prisoner,Guard,Visitor, Gender, Status, Offense


# DataBase auto-increment fix stuff
def reset_auto_increment(modeladmin, request, queryset):
    # Get the table name associated with the model
    prison_prisoner = queryset.model._meta.db_table

    # Execute raw SQL to reset the auto-increment counter
    with connection.cursor() as cursor:
        cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{prison_prisoner}'")

    reset_auto_increment.short_description = "Reset Auto-Increment"

# Register your models here.
admin.site.register(Gender)
admin.site.register(Status)
admin.site.register(Offense)

admin.site.register(Cell)
admin.site.register(Prisoner)
admin.site.register(Guard)
admin.site.register(Visitor)


# DataBase delete Try fix
# class Prisoner(admin.ModelAdmin):
#     def get_queryset(self, request):
#         # Exclude deleted objects from the queryset
#         qs = super().get_queryset(request)
#         qs = qs.exclude(deleted=True)  # Assuming you have a 'deleted' field in your model
#         return qs

#     def get_changelist_instance(self, request):
#         # Override the change list instance to exclude deleted objects from the object count
#         from django.contrib.admin.views.main import ChangeList
#         ChangeList.result_count = lambda self: self.full_result_count - self.queryset.exclude(deleted=True).count()
#         return super().get_changelist_instance(request)

# admin.site.register(YourModelName, YourModelAdmin)
