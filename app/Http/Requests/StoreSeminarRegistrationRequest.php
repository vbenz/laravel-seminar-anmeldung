<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeminarRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:16'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'mail' => ['required', 'email:rfc,dns', 'max:255'],
            'seminar_fk' => ['required', 'exists:seminar,id'],
            'participant_count' => ['required', 'integer', 'min:1'],
            'remarks' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Clean the incoming values before validation is finalized.
     */
    protected function passedValidation(): void
    {
        $this->merge([
            'title' => trim(strip_tags((string) $this->input('title', ''))),
            'first_name' => trim(strip_tags((string) $this->input('first_name', ''))),
            'last_name' => trim(strip_tags((string) $this->input('last_name', ''))),
            'mail' => mb_strtolower(trim((string) $this->input('mail', ''))),
            'remarks' => $this->filled('remarks')
                ? trim(strip_tags((string) $this->input('remarks', '')))
                : null,
        ]);
    }
}
