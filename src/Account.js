import { useForm } from 'react-hook-form'
import 'react-notifications/lib/notifications.css'
import { NotificationManager, NotificationContainer } from 'react-notifications'
import { useEffect } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import useUpdateProfile from 'hooks/useUpdateProfile'

export default function Account() {
  const history = useHistory()
  const { me, getMe } = useContext(AuthContext)
  const [updateProfile, isLoading] = useUpdateProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await updateProfile(data)
      await getMe()
      NotificationManager.success('Profile berhasil perbaharui', 'Sukses')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (me) {
      reset({
        name: me.name,
        email: me.email,
        address: me.address,
      })
    } else {
      history.push({
        pathname: '/login',
        state: { message: 'Silakan login terlebih dahulu' },
      })
    }
  }, [me])

  return (
    <>
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">My Account</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.name ? 'is-invalid' : ''
                            }`}
                            placeholder="Input Name"
                            {...register('name', { required: 'harus diisi' })}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name.message}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.email ? 'is-invalid' : ''
                            }`}
                            placeholder="Input Email"
                            {...register('email', { required: 'harus diisi' })}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email.message}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <textarea
                            className={`form-control ${
                              errors.address ? 'is-invalid' : ''
                            }`}
                            placeholder="Input Address"
                            {...register('address', {
                              required: 'harus diisi',
                            })}
                          />
                          {errors.address && (
                            <div className="invalid-feedback">
                              {errors.address.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex">
                      <button type="submit" className="btn btn-primary ms-auto">
                        {isLoading ? 'Loading...' : 'Simpan'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}
