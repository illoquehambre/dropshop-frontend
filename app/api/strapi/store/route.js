// app/api/stores/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // 1. Obtener token
    const token = cookies().get('token')?.value;
    console.log('Token:', token);
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // 2. Leer FormData
    const formData = await request.formData();
    const payload = JSON.parse(formData.get('data') );
    const logoFile = formData.get('files.logo') ;

    let logoId = null;

    // 3. Subida de logo
    if (logoFile) {
      try {
        const uploadData = new FormData();
        uploadData.append('files', logoFile);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: uploadData,
          }
        );

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          console.error('Upload error:', errText);
          return NextResponse.json(
            { error: `Error subiendo logo: ${errText}` },
            { status: uploadRes.status }
          );
        }
        console.log('Upload response:', uploadRes);
        const files = await uploadRes.json();
        logoId = (files )[0]?.id;
        if (!logoId) {
          throw new Error('ID de logo no recibido');
        }
      } catch (uploadError) {
        console.error('Excepción en upload:', uploadError);
        return NextResponse.json(
          { error: `Excepción en subida de logo: ${uploadError.message}` },
          { status: 500 }
        );
      }
    }

    // 4. Crear tienda
    try {
      const createBody = {
        data: {
          title: payload.title,
          slug: payload.slug,
          ...(logoId ? { logo: [logoId] } : {}),
        },
      };

      const createRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/stores`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(createBody),
        }
      );

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error('Create error:', errText);
        return NextResponse.json(
          { error: `Error creando tienda: ${errText}` },
          { status: createRes.status }
        );
      }

      const result = await createRes.json();
      return NextResponse.json({ store: result }, { status: 201 });
    } catch (createError) {
      console.error('Excepción creando tienda:', createError);
      return NextResponse.json(
        { error: `Excepción al crear tienda: ${createError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error inesperado en POST /api/stores:', error);
    return NextResponse.json(
      { error: 'Error inesperado en el servidor' },
      { status: 500 }
    );
  }
}
