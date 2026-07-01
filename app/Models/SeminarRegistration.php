<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeminarRegistration extends Model
{
    protected $table = 'seminar_registration';

    protected $fillable = [
        'title',
        'first_name',
        'last_name',
        'mail',
        'seminar_fk',
        'participant_count',
        'remarks',
    ];
}
