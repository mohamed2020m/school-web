import React,{ useState} from 'react'
import { useStudents } from '../../hooks/useStudents'
import { useForm } from '../../hooks/useForm'
import { addStudent, editStudent} from '../../services/students'
import { Button } from '../Button'
import { RawModal } from '../RawModal'
import { TextInput } from '../TextInput'
import Select from 'react-select'

export const ModalStudents= ({ onClose, isEdit, filieresList, rolesList, item}) => {
    const [isValid, setIsValid] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [error, setError] = useState(false)
    const { dispatch } = useStudents()
    const [selectedFiliere, setSelectedFiliere] = useState(filieresList.length > 0 ? filieresList[0] : null);
    const [selectedRoles, setSelectedRoles] = useState( isEdit ? item.roles.map(role => ({ value: role.id, label: role.name })) : []);
    
    const newRolesList = rolesList.map(role => ({
        value: role.id,
        label: role.name
    }));

    const defaultRoles = isEdit
        ? item.roles.map(role => newRolesList.find(r => r.value === role.id))
        : [];
        

    const handleFiliereChange = (e) => {
        const selectedFiliereId = e.target.value;
        const filiere = filieresList.find((f) => f.id === parseInt(selectedFiliereId));
        setSelectedFiliere(filiere);
    };

    const handleRolesChange = (selectedOptions) => {
        console.log(selectedRoles)
        setSelectedRoles(selectedOptions);
    };

    const { values, handlerChange } = useForm({
        username: isEdit ? item.username : '',
        name: isEdit ? item.name : '',
        email: isEdit ? item.email : '',
        phone: isEdit ? item.phone : '',
        filiere : isEdit ? item.filiere : {},
        roles : isEdit ? item.roles : []
    })

    const { username, name, email, phone, filiere, roles} = values

    const handlerAdd = async (e) => {
        e.preventDefault()

        if (
            username !== '' &&
            name !== '' &&
            email !== '' &&
            phone !== '' 
        ) {

        setBtnLoading(true)
        setIsValid(false)
        setError(false)
        
        const filiere = selectedFiliere;
        const roles = selectedRoles.map(role => ({
            id: role.value,
            name: role.label
        }));

        const { error, dataStudent } = await addStudent({username, name, email, phone, filiere, roles})

        if (!error) {
            dispatch({ type: 'ADD_Student', payload: dataStudent })
            onClose()
            return
        }

        setError(true)
        setBtnLoading(false)
        return
        }

        setIsValid(true)
        setError(false)
    }

    const handlerEdit = async (e) => {
        e.preventDefault()

        if (
            username !== '' &&
            name !== '' &&
            email !== '' &&
            phone !== ''
        ) {
            setBtnLoading(true)
            setIsValid(false)
            setError(false)
            
            const filiere = selectedFiliere;
            const roles = selectedRoles.map(role => ({
                id: role.value,
                name: role.label
            }));
            
            const id = item?.id;
            const val = { id, username, name, email, phone, filiere, roles};

            const { error } = await editStudent(item?.id, val)

            if (!error) {
                dispatch({
                    type: 'EDIT_Student',
                    payload: { ...item, ...val}
                })

                onClose()
                return
            }

            setError(true)
            setBtnLoading(false)
            return
        }

        setIsValid(true)
        setError(false)
    }

    return (
        <RawModal onClose={onClose}>
        <form
            onSubmit={isEdit ? handlerEdit : handlerAdd}
            className='flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8'
        >
            <h3 className='text-xl text-center font-medium text-gray-600'>
                {isEdit ? 'Edit Student' : 'Add a new Student'}
            </h3>

            <TextInput
                name='username'
                placeholder='Username'
                value={username}
                onChange={handlerChange}
            />

            <TextInput
                name='name'
                placeholder='Name'
                value={name}
                onChange={handlerChange}
            />


            <TextInput
                name='email'
                placeholder='Email'
                value={email}
                type="email"
                onChange={handlerChange}
            />

            <TextInput
                name='phone'
                placeholder='Phone'
                value={phone}
                onChange={handlerChange}
            />

            <select
                value={selectedFiliere ? selectedFiliere.id : ''} 
                onChange={handleFiliereChange}
                name='filiers'
                className='py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none'
            >
                {Array.isArray(filieresList) && filieresList.length > 0 ? (
                    <>
                        <option disabled>Select Filiere</option>
                        {filieresList.map((filiere) => (
                        <option key={filiere.id} value={filiere.id}>
                            {filiere.code}
                        </option>
                        ))}
                    </>
                ) : (
                    <option value="">No filieres available</option>
                )}
            </select>
                    
            <Select 
                value={selectedRoles}
                defaultValue={defaultRoles}
                onChange={handleRolesChange}
                options={newRolesList}
                isMulti
            />

            {/* Validation and Errors */}
            {isValid && (
            <div className='flex items-center justify-end'>
                <p className='text-red-500 text-sm font-bold'>
                All fields are required.
                </p>
            </div>
            )}

            {error && (
            <div className='flex items-center justify-end'>
                <p className='text-red-500 text-sm font-bold'>
                Something went wrong.
                </p>
            </div>
            )}

            <hr />

            {/* Footer */}
            <div className='flex items-center justify-end space-x-2'>
            <Button label='Close' isClose click={onClose} />
            <Button
                label={btnLoading ? 'Loading...' : isEdit ? 'Edit' : 'Add'}
                isSubmit
                isLoading={btnLoading}
            />
            </div>
        </form>
        </RawModal>
    )
}
