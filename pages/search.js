import { useRouter } from "next/dist/client/router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { format } from "date-fns"
import InfoCard from "./components/InfoCard"
import Map from "./components/Map"

function Search({ searchResults }) {
  const router = useRouter()

  const { location, startDate, endDate, noOfGuests } = router.query

  const formattedStartDate = format(new Date(startDate), "dd MMM yy")
  const formattedEndDate = format(new Date(endDate), "dd MMM yy")
  const range = `${formattedStartDate}  - ${formattedEndDate}`
  return (
    <div>
      <Header placeholder={`${location} | ${range}  | ${noOfGuests}`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            {" "}
            300+ Stays {range} for {noOfGuests} number Guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stay in {location}
          </h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancelation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>

          {searchResults?.map(
            ({
              img,
              location,
              title,
              description,
              star,
              price,
              total,
              long,
              lat,
            }) => (
              <InfoCard
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
                long={long}
                lat={lat}
              />
            )
          )}
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map s={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Search

export const getServerSideProps = async () => {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (x) => x.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}