import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type SubmitEvent } from 'react';

type SeminarOption = {
    id: number;
    name: string;
    price: number;
};

type SeminarRegistrationProps = {
    seminars: SeminarOption[];
    flash: {message: string}
};

export default function SeminarRegistration({ seminars, flash }: SeminarRegistrationProps) {

    useEffect(() => {
        const {message} = flash
        if (message) {
            setMessage(message)
        }
    }, [flash.message])
    
    const [formData, setFormData] = useState({
        title: '',
        first_name: '',
        last_name: '',
        mail: '',
        seminar_fk: '',
        participant_count: '1',
        remarks: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    

    const eurFormatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    const handleChange = (
        event:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
            | FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.currentTarget;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (data: FormData) => {
        setMessage(null);
        setErrors({});

        router.post('/seminar-registration', data, {
            onSuccess: () => {
                setFormData({
                    title: '',
                    first_name: '',
                    last_name: '',
                    mail: '',
                    seminar_fk: '',
                    participant_count: '1',
                    remarks: '',
                });
            },
            onError: (error) => {
                setErrors(error as Record<string, string>);
            },
        });
    };

    const previewSummary = (() => {
        const selectedSeminar = seminars.find((seminar) => seminar.id.toString() === formData.seminar_fk);
        const participantCount = Math.max(1, Number.parseInt(formData.participant_count || '1', 10) || 1);
        const seminarPrice = selectedSeminar ? Number(selectedSeminar.price) : 0;
        const previewSeminarPrice = eurFormatter.format(seminarPrice);
        const previewSum = eurFormatter.format(participantCount * seminarPrice);

        return {
            selectedSeminar,
            participantCount,
            previewSeminarPrice,
            previewSum,
        };
    })();

    return (
        <>
            <Head title="Seminar-Anmeldung" />
            <div className="mx-auto max-w-150 p-6">
                <h1 className="text-2xl font-semibold">Seminar-Anmeldung</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Hier können Sie sich zu einem unserer Fachseminare anmelden.
                </p>

                <form action={handleSubmit} className="mt-6 space-y-4">
                    {message ? (
                        <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                            {message}
                        </div>
                    ) : null}

                    {Object.keys(errors).length > 0 ? (
                        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            Bitte prüfen Sie Ihre Eingaben.
                        </div>
                    ) : null}

                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="title">
                            Titel
                        </label>
                        <select
                            id="title"
                            name="title"
                            value={formData.title}
                            onInput={handleChange}
                            required
                            className={`w-full rounded border p-2 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
                        >
                            <option value="">Bitte wählen</option>
                            <option value="Dr">Dr.</option>
                            <option value="ProfDr">Prof. Dr.</option>
                            <option value="Herr">Herr</option>
                            <option value="Frau">Frau</option>
                        </select>
                        {errors.title ? <p className="mt-1 text-sm text-red-600">{errors.title}</p> : null}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium" htmlFor="first_name">
                                Vorname
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onInput={handleChange}
                                required
                                className={`w-full rounded border p-2 ${errors.first_name ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.first_name ? <p className="mt-1 text-sm text-red-600">{errors.first_name}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium" htmlFor="last_name">
                                Nachname
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onInput={handleChange}
                                required
                                className={`w-full rounded border p-2 ${errors.last_name ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.last_name ? <p className="mt-1 text-sm text-red-600">{errors.last_name}</p> : null}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="mail">
                            E-Mail
                        </label>
                        <input
                            id="mail"
                            type="email"
                            name="mail"
                            value={formData.mail}
                            onInput={handleChange}
                            required
                            className={`w-full rounded border p-2 ${errors.mail ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.mail ? <p className="mt-1 text-sm text-red-600">{errors.mail}</p> : null}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="seminar_fk">
                            Seminar
                        </label>
                        <select
                            id="seminar_fk"
                            name="seminar_fk"
                            value={formData.seminar_fk}
                            onInput={handleChange}
                            required
                            className={`w-full rounded border p-2 ${errors.seminar_fk ? 'border-red-400' : 'border-gray-300'}`}
                        >
                            <option value="">Bitte wählen</option>
                            {seminars.map((seminar) => (
                                <option key={seminar.id} value={seminar.id}>
                                    {seminar.name}
                                </option>
                            ))}
                        </select>
                        {errors.seminar_fk ? <p className="mt-1 text-sm text-red-600">{errors.seminar_fk}</p> : null}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="participant_count">
                            Teilnehmeranzahl
                        </label>
                        <input
                            id="participant_count"
                            type="number"
                            min="1"
                            name="participant_count"
                            value={formData.participant_count}
                            onInput={handleChange}
                            required
                            className={`w-full rounded border p-2 ${errors.participant_count ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.participant_count ? <p className="mt-1 text-sm text-red-600">{errors.participant_count}</p> : null}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="remarks">
                            Bemerkungen
                        </label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onInput={handleChange}
                            rows={4}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 font-medium text-white"
                    >
                        Anmeldung senden
                    </button>
                </form>

                <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-lg font-semibold">Live-Vorschau</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        {formData.title || '<Titel>'} {formData.first_name || '<Vorname>'} {formData.last_name || '<Nachname>'} - {formData.mail || '<E-Mail>'} bucht:
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                        Seminar: {previewSummary.selectedSeminar ? previewSummary.selectedSeminar.name : '<Seminar>'} ({previewSummary.participantCount} x {previewSummary.selectedSeminar ? previewSummary.previewSeminarPrice : '<Preis>'}) = {previewSummary.previewSum}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                        Anmerkung: "{formData.remarks || ''}"
                    </p>
                </div>
            </div>
        </>
    );
}